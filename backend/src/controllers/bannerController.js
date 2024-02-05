const path = require('path');
const Banner = require('../models/bannerModel'); // Assuming you have an banner model
const storageBucket = require('../../config/firebase/firebaseConfig');

const bannerController = {

    createBanner: async (req, res) => {
        try {
            // Validate request
            if (!req.file || !req.body.bannerName) {
                return res.status(400).json({ error: 'Invalid request data' });
            }
            const { url, filepath } = await processAndUploadImage(req.file, req.body.bannerName);

            const newBanner = new Banner({
                bannerName: req.body.bannerName,
                bannerImage: {
                    url: url,
                    filepath: filepath,
                },
            });

            await newBanner.save();

            res.json(newBanner);
        } catch (error) {
            console.error('Error in createBanner:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAllBanners: async (req, res) => {
        try {
            const banners = await Banner.find();
            res.json(banners);
        } catch (error) {
            console.error('Error in getAllBanners:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getBannerById: async (req, res) => {
        try {
            const bannerId = req.params.bannerId;
            const banner = await Banner.findById(bannerId);

            if (!banner) {
                return res.status(404).json({ error: 'Banner not found' });
            }

            res.json(banner);
        } catch (error) {
            console.error('Error in getBannerById:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteBanner: async (req, res) => {
        try {
            const bannerId = req.params.bannerId;
            const banner = await Banner.findById(bannerId);

            if (!banner) {
                return res.status(404).json({ error: 'Banner not found' });
            }

            // Remove the banner image from Firebase Storage
            const file = storageBucket.file(banner.bannerImage.filepath);
            await file.delete();

            // Delete the banner from the database
            await Banner.findByIdAndDelete(bannerId);

            res.json({ message: 'Banner deleted successfully' });
        } catch (error) {
            console.error('Error in deleteBanner:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

};

async function processAndUploadImage(file, bannerName) {
    try {

        const { buffer, originalname, mimetype } = file;

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = `BannerImage/${bannerName}-${path.extname(originalname)}`;
        const fileUpload = storageBucket.file(filename);
        const stream = fileUpload.createWriteStream({
            metadata: {
                contentType: mimetype,
            },
        });

        stream.end(buffer);

        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${storageBucket.name}/o/${encodeURIComponent(fileUpload.name)}?alt=media&token=${uniqueSuffix}`;

        return {
            url: imageUrl,
            filepath: filename, // Modify this line to include the full filepath
        };
    } catch (error) {
        console.error('Error in processAndUploadImage:', error);
        throw error; // Propagate the error to the calling function
    }
}



module.exports = bannerController;

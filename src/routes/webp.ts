import express from "express";
import sharp from "sharp";
const router = express.Router();

const processOptions = {
    resize: {
        width: 1280,
        withoutEnlargement: true,
    },
}

const encodeOptions = {
    webp: {
        quality: 6,
    },
}

router.get("/", async (req, res) => {
    try {
        console.log('webp')
        const remoteUrlQuery = req.query.url?.toString();
        console.log(remoteUrlQuery)
        if (!remoteUrlQuery) {
            res.status(400).send("Missing url query parameter");
            return;
        }

        const remoteRes = await fetch(remoteUrlQuery);

        // const remoteRes = await new Promise<Response>(async (res, rej) => {
        //     try {
        //         res(await fetch(remoteUrlQuery))
        //     } catch (e) {
        //         rej()
        //     }
        // }).catch(() => {
        //     res.status(500).send('Unknown fetch error');
        //     return;
        // })
        //
        if (!remoteRes.ok) {
            res.status(500).send("Unknown fetch error");
            return;
        }
        console.log(remoteRes.headers.get("content-type"));
        if (!remoteRes.headers.get("content-type")?.startsWith("image/")) {
            res.redirect(remoteUrlQuery);
            return;
        }
        const remoteBuffer = await remoteRes.arrayBuffer();

        const image = await sharp(Buffer.from(remoteBuffer))
            .resize(processOptions.resize)
            .webp(encodeOptions.webp)
            .toBuffer();

        res.header("Content-Type", "image/webp");
        res.send(await image);
    } catch (e) {
        res.status(500).send("Unknown exception")
        return
    }
});


export default router;

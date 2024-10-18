import {provide} from "inversify-binding-decorators";
import {Client} from "minio";
import {Readable} from "node:stream";
import * as webStream from 'node:stream/web'

@provide(FileBucket)
export class FileBucket {
    private minioClient: Client;

    private readonly bucketInitPromise: Promise<void>;

    constructor() {
            this.minioClient = new Client({
                endPoint: FileBucket.HOSTNAME,
                port: FileBucket.PORT,
                useSSL: FileBucket.USE_SSL,
                accessKey: FileBucket.ACCESS_KEY,
                secretKey: FileBucket.SECRET_KEY,
            })

            this.bucketInitPromise = this.initBucket()
    }

    private async initBucket(): Promise<void> {
        const isExistBucket = await this.minioClient.bucketExists(FileBucket.BUCKET_NAME);
        if (!isExistBucket) await this.minioClient.makeBucket(FileBucket.BUCKET_NAME);

        const bucketLifecycle = await this.minioClient.getBucketLifecycle(FileBucket.BUCKET_NAME).then((value) => value).catch(() => null);
        if (!bucketLifecycle) await this.minioClient.setBucketLifecycle(FileBucket.BUCKET_NAME, {
            Rule: [{
                ID: "Expiration Rule",
                Expiration: { Days: 1 },
                Status: 'Enabled',
                Prefix: ''
            }]
        })
    }

    async uploadFile(file: File): Promise<string> {
        await this.bucketInitPromise;

        const name = this.generateFileName(file)

        await this.minioClient.putObject(FileBucket.BUCKET_NAME, name, Readable.fromWeb(file.stream() as webStream.ReadableStream), file.size)
        return await this.minioClient.presignedGetObject(FileBucket.BUCKET_NAME, name)
    }

    private generateFileName(file: File) {
        let abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        abc += abc.toLowerCase();
        abc += '123456789';

        const length = abc.length;

        let name = "";

        while (name.length < 32) {
            const randomIndex = Math.floor(Math.random() * length);
            name += abc.charAt(randomIndex);
        }

        const ext = file.name.split(".").at(-1);
        if (!!ext) return `${name}.${ext}`;
        return name;
    }

    private static BUCKET_NAME = "template-bucket"
    private static HOSTNAME = `${process.env.MINIO_HOSTNAME}`;
    private static PORT = +(process.env.MINIO_PORT ?? 0);
    private static ACCESS_KEY = `${process.env.MINIO_ACCESS_KEY}`;
    private static SECRET_KEY = `${process.env.MINIO_SECRET_KEY}`;
    private static USE_SSL = !!process.env.MINIO_USE_SSL;
}
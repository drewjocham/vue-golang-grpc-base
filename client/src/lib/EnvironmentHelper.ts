export class EnvironmentHelper {
    public static get isDevelopment(): boolean {
        return process.env.ENV === "development";
    }

    public static get isProduction(): boolean {
        return process.env.ENV === "production";
    }

    public get baseUrl(): string {
        if (EnvironmentHelper.isDevelopment) {
            return "http://localhost:8081"
        }
        if (EnvironmentHelper.isProduction) {
            return "http://api:8081"
        }
        // wrong port number - something is wrong!
        return "http://localhost:8080";
    }
}


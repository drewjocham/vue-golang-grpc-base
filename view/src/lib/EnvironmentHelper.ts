export class EnvironmentHelper {
    public static get isDevelopment(): boolean {
        return process.env.NODE_ENV === "development";
    }

    public static get isProduction(): boolean {
        return process.env.NODE_ENV === "production";
    }

    public get baseUrl(): string {
        if (EnvironmentHelper.isDevelopment) {
            return "http://localhost:8081"
        }
        if (EnvironmentHelper.isProduction) {
            return ""
        }

        return "/";
    }
}


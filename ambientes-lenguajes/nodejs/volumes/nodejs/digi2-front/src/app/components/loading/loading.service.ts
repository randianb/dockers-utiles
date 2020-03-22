import { Injectable } from "@angular/core";

@Injectable()
export class LoadingService {
    private loadings: object = {};

    show(name) {
        if (!name) {
            name = "main";
        }
        this.loadings[name] = true;
    }

    hide(name) {
        if (!name) {
            name = "main";
        }
        this.loadings[name] = false;
    }

    register(name) {
        if (this.loadings.hasOwnProperty(name)) {
            throw new Error("Loading named " + name + " already exists.");
        } else {
            this.loadings[name] = false;
        }
    }

    unregister(name) {
        if (this.loadings.hasOwnProperty(name)) {
            delete this.loadings[name];
        }
    }

    isRegistered(name) {
        if (this.loadings.hasOwnProperty(name)) {
            return true;
        }
        return false;
    }

    isLoading(name) {
        if (!this.loadings.hasOwnProperty(name)) {
            throw new Error("Invalid loading name " + name);
        }
        return this.loadings[name];
    }
}

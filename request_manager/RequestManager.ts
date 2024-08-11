import { BASE_URL_HTTP } from "@/consts/request_manager";
import { EventBus } from "@/event_bus/EventBus";
import { setItemAsync } from "expo-secure-store";

interface SignUpBody {
  username: string;
  password: string;
}

interface SignInBody {
  username: string;
  password: string;
}

export class RequestManager {
  static name = "request_manager";
  baseUrl = BASE_URL_HTTP;

  constructor(private eventBus: EventBus) {
    this.eventBus.subscribe("sign_in", this.signIn.bind(this), {
      subscriber: RequestManager.name,
    });
    this.eventBus.subscribe("sign_up", this.signUp.bind(this), {
      subscriber: RequestManager.name,
    });
  }

  async signUp(body: SignUpBody) {
    const url = `${this.baseUrl}/auth/signup`;
    const response = await this.wrappedFetch(url, {
      body: body,
      method: "POST",
    });
    if (!response)
      return {
        ok: false,
        error: "Looking like server is unavailable. Try again later.",
      } as const;
    if (!response.ok) {
      const json = await this.wrappedJson(response);
      const error = json.message
        ? Array.isArray(json.message)
          ? json.message[0]
          : json.message
        : json.error;
      return {
        ok: false,
        error,
      } as const;
    }
    const json = await this.wrappedJson(response);
    if (!json) return { ok: false, error: "Unexpected error" } as const;

    const accessToken = json["access_token"];
    if (!accessToken) return { ok: false, error: "Unexpected error" } as const;

    await setItemAsync("access_token", accessToken).then(undefined, (e) => e);
    return { ok: true } as const;
  }

  async signIn(body: SignInBody) {
    const url = `${this.baseUrl}/auth/signin`;
    const response = await this.wrappedFetch(url, {
      body: body,
      method: "POST",
    });
    if (!response)
      return {
        ok: false,
        error: "Loking like server is unavailable. Try again letter.",
      } as const;
    if (!response.ok) {
      const json = await this.wrappedJson(response);
      const error = json.message
        ? Array.isArray(json.message)
          ? json.message[0]
          : json.message
        : json.error;
      return {
        ok: false,
        error,
      } as const;
    }

    const json = await this.wrappedJson(response);
    if (!json) return { ok: false, error: "Unexpected error" } as const;

    const accessToken = json["access_token"];
    if (!accessToken) return { ok: false, error: "Unexpected error" } as const;

    await setItemAsync("access_token", accessToken);
    return { ok: true } as const;
  }

  async wrappedFetch(
    url: string,
    options?: Omit<RequestInit, "body"> & { body: any },
  ): Promise<Response | undefined> {
    try {
      if (!options) return;

      const request: Request = new Request(url, {
        method: options.method,
        body: JSON.stringify(options.body),
        headers: {
          ...options.headers,
          "Content-Type": "application/json",
        },
      });

      const response = await fetch(request);
      return response;
    } catch (error) {
      return undefined;
    }
  }
  async wrappedJson(response: Response): Promise<any | undefined> {
    try {
      const json = await response.json();
      return json;
    } catch (error) {
      return undefined;
    }
  }
}

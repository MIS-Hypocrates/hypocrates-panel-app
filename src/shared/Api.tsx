import "reflect-metadata";
import { provide } from "inversify-binding-decorators";

const mock = {
  "https://api.clinics.com/clinicInformation": {
    clinicName: "Demo",
  },
  "https://api.clinics.com/clients?page=1": {
    page: 1,
    data: new Array(10)
      .fill({
        id: 1,
        name: "Батюхно Никита Сергеевич",
        birthday: "12.05.2000",
        age: "24",
      })
      .map((item, i) => ({ ...item, id: i + 1 })),
    countPage: 3,
    countData: 25,
  },
  "https://api.clinics.com/clients?page=2": {
    page: 2,
    data: new Array(10)
      .fill({
        id: 1,
        name: "Батюхно Никита Сергеевич",
        birthday: "12.05.2000",
        age: "24",
      })
      .map((item, i) => ({ ...item, id: i + 11 })),
    countPage: 3,
    countData: 25,
  },
  "https://api.clinics.com/clients?page=3": {
    page: 3,
    data: new Array(5)
      .fill({
        id: 1,
        name: "Батюхно Никита Сергеевич",
        birthday: "12.05.2000",
        age: "24",
      })
      .map((item, i) => ({ ...item, id: i + 21 })),
    countPage: 5,
    countData: 25,
  },
  "https://api.clinics.com/clients?peerPage=10&page=1": {
    page: 1,
    data: new Array(10)
      .fill({
        id: 1,
        name: "Батюхно Никита Сергеевич",
        birthday: "12.05.2000",
        age: "24",
      })
      .map((item, i) => ({ ...item, id: i + 1 })),
    countPage: 3,
    countData: 25,
  },
  "https://api.clinics.com/clients?peerPage=10&page=2": {
    page: 2,
    data: new Array(10)
      .fill({
        id: 1,
        name: "Батюхно Никита Сергеевич",
        birthday: "12.05.2000",
        age: "24",
      })
      .map((item, i) => ({ ...item, id: i + 11 })),
    countPage: 3,
    countData: 25,
  },
  "https://api.clinics.com/clients?peerPage=10&page=3": {
    page: 3,
    data: new Array(5)
      .fill({
        id: 1,
        name: "Батюхно Никита Сергеевич",
        birthday: "12.05.2000",
        age: "24",
      })
      .map((item, i) => ({ ...item, id: i + 21 })),
    countPage: 5,
    countData: 25,
  },
  "https://api.clinics.com/clients?peerPage=25&page=1": {
    page: 1,
    data: new Array(25)
      .fill({
        id: 1,
        name: "Батюхно Никита Сергеевич",
        birthday: "12.05.2000",
        age: "24",
      })
      .map((item, i) => ({ ...item, id: i + 1 })),
    countPage: 1,
    countData: 25,
    peerPage: 1,
  },
  "https://api.clinics.com/clients?peerPage=25&page=2": {
    page: 1,
    data: new Array(25)
      .fill({
        id: 1,
        name: "Батюхно Никита Сергеевич",
        birthday: "12.05.2000",
        age: "24",
      })
      .map((item, i) => ({ ...item, id: i + 1 })),
    countPage: 1,
    countData: 25,
    peerPage: 1,
  },
  "https://api.clinics.com/clients?page=3&peerPage=25": {
    page: 1,
    data: new Array(25)
      .fill({
        id: 1,
        name: "Батюхно Никита Сергеевич",
        birthday: "12.05.2000",
        age: "24",
      })
      .map((item, i) => ({ ...item, id: i + 1 })),
    countPage: 1,
    countData: 25,
    peerPage: 1,
  },
  "https://api.clinics.com/clients?page=1&peerPage=100": {
    page: 1,
    data: new Array(25)
      .fill({
        id: 1,
        name: "Батюхно Никита Сергеевич",
        birthday: "12.05.2000",
        age: "24",
      })
      .map((item, i) => ({ ...item, id: i + 1 })),
    countPage: 1,
    countData: 25,
    peerPage: 1,
  },
  "https://api.clinics.com/clients?page=2&peerPage=100": {
    page: 1,
    data: new Array(25)
      .fill({
        id: 1,
        name: "Батюхно Никита Сергеевич",
        birthday: "12.05.2000",
        age: "24",
      })
      .map((item, i) => ({ ...item, id: i + 1 })),
    countPage: 1,
    countData: 25,
    peerPage: 1,
  },
  "https://api.clinics.com/clients?page=3&peerPage=100": {
    page: 1,
    data: new Array(25)
      .fill({
        id: 1,
        name: "Батюхно Никита Сергеевич",
        birthday: "12.05.2000",
        age: "24",
      })
      .map((item, i) => ({ ...item, id: i + 1 })),
    countPage: 1,
    countData: 25,
    peerPage: 1,
  },
};

@provide(Api)
export class Api {
  async get<T>(
    endpoint: string,
    payload: Record<string, string> = {},
  ): Promise<T | null> {
    const url = new URL(endpoint, "https://api.clinics.com");
    for (const key in payload) {
      url.searchParams.append(key, payload[key]);
    }

    console.log(url.toString());

    return new Promise((resolve) =>
      setTimeout(resolve, 300, mock[url.toString()] as T),
    );

    try {
      const data = await fetch(url);

      if (data.ok) {
        return data.json() as T;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  async post<T, TT>(endpoint: string, payload: T): Promise<TT | null> {
    const url = new URL(endpoint, "https://api.clinics.com");
    for (const key in payload) {
      url.searchParams.append(key, payload[key]);
    }

    console.log(url.toString());

    return new Promise((resolve) =>
      setTimeout(resolve, 300, mock[url.toString()] as T),
    );

    try {
      const data = await fetch(url, { method: "POST" });

      if (data.ok) {
        return data.json() as T;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  async update<T, TT>(endpoint: string, payload: T): Promise<TT | null> {
    const url = new URL(endpoint, "https://api.clinics.com");
    for (const key in payload) {
      url.searchParams.append(key, payload[key]);
    }

    console.log(url.toString());

    return new Promise((resolve) =>
      setTimeout(resolve, 300, mock[url.toString()] as T),
    );

    try {
      const data = await fetch(url, { method: "POST" });

      if (data.ok) {
        return data.json() as T;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }
}

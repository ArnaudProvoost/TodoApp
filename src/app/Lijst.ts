import { Item } from "./Item";

export interface Lijst {
    id: number;
    title: string;
    lijstbackgroundcolor: string;
    items: Item[];
}

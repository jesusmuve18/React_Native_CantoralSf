import { Model } from "@nozbe/watermelondb";
import { field } from '@nozbe/watermelondb/decorators'

export default class Song extends Model {
    static table = 'songs'

    @field('title') title
    @field('author') author
    @field('tone') tone
    @field('capo') capo
    @field('content') content
}
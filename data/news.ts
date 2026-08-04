import "server-only";
import { databaseQuery } from "@/lib/postgres";
import type { NewsItem } from "@/types/news";
interface Row{id:string;title:string;slug:string;excerpt:string|null;content:string;imageUrl:string|null;publishedAt:string|null;}
function format(row:Row,index=0):NewsItem{return{id:row.id,displayId:String(index+1).padStart(2,"0"),title:row.title,slug:row.slug,excerpt:row.excerpt??undefined,content:row.content,image:row.imageUrl||"/images/hero/hero-pfa-player.webp",date:row.publishedAt?new Date(row.publishedAt).toLocaleDateString("ru-RU"):""};}
const fields=`"id","title","slug","excerpt","content","imageUrl","publishedAt"`;
export async function getPublishedNews():Promise<NewsItem[]>{try{return(await databaseQuery<Row>(`SELECT ${fields} FROM "News" WHERE "isPublished"=true AND "publishedAt"<=CURRENT_TIMESTAMP ORDER BY "publishedAt" DESC`)).map(format);}catch{console.warn("Published news are temporarily unavailable.");return[];}}
export async function getPublishedNewsBySlug(slug:string):Promise<NewsItem|null>{try{const rows=await databaseQuery<Row>(`SELECT ${fields} FROM "News" WHERE "slug"=$1 AND "isPublished"=true AND "publishedAt"<=CURRENT_TIMESTAMP LIMIT 1`,[slug]);return rows[0]?format(rows[0]):null;}catch{console.warn("News article is temporarily unavailable.");return null;}}

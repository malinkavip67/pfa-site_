import "server-only";
import { databaseQuery } from "@/lib/postgres";
import type { NewsItem } from "@/types/news";
interface Row{id:string;title:string;slug:string;excerpt:string|null;content:string;imageUrl:string|null;publishedAt:string|null;}

const optimizedNewsImages: Record<string, string> = {
  "/images/news/football-negotiation-mistakes-2026.png": "/images/news/football-negotiation-mistakes-2026.webp",
  "/images/news/international-cooperation-2026.png": "/images/news/international-cooperation-2026.webp",
  "/images/news/professional-club-trial-2026.png": "/images/news/professional-club-trial-2026.webp",
  "/images/news/roman-zuev-bentonit-contract.png": "/images/news/roman-zuev-bentonit-contract.webp",
  "/images/news/vietnam-scouting-2026.png": "/images/news/vietnam-scouting-2026.webp",
};

function format(row:Row,index=0):NewsItem{
  const image = row.imageUrl
    ? optimizedNewsImages[row.imageUrl] ?? row.imageUrl
    : "/images/hero/hero-pfa-player.webp";

  return{id:row.id,displayId:String(index+1).padStart(2,"0"),title:row.title,slug:row.slug,excerpt:row.excerpt??undefined,content:row.content,image,date:row.publishedAt?new Date(row.publishedAt).toLocaleDateString("ru-RU"):""};
}
const fields=`"id","title","slug","excerpt","content","imageUrl","publishedAt"`;
export async function getPublishedNews():Promise<NewsItem[]>{try{return(await databaseQuery<Row>(`SELECT ${fields} FROM "News" WHERE "isPublished"=true AND "publishedAt"<=CURRENT_TIMESTAMP ORDER BY "publishedAt" DESC`)).map(format);}catch{console.warn("Published news are temporarily unavailable.");return[];}}
export async function getPublishedNewsBySlug(slug:string):Promise<NewsItem|null>{try{const rows=await databaseQuery<Row>(`SELECT ${fields} FROM "News" WHERE "slug"=$1 AND "isPublished"=true AND "publishedAt"<=CURRENT_TIMESTAMP LIMIT 1`,[slug]);return rows[0]?format(rows[0]):null;}catch{console.warn("News article is temporarily unavailable.");return null;}}

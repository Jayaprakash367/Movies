import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

// ULTRA-RELIABLE Movie Trailers - With Language Tags
const MOCK_TRAILERS = [
  // TOP TIER BLOCKBUSTERS - English
  { videoId: "TcMBFSGVi1c", title: "Avengers Endgame", thumbnail: "https://img.youtube.com/vi/TcMBFSGVi1c/sddefault.jpg", channel: "Marvel", publishedAt: "2019-03-14T13:00:00Z", channelId: "UC1", language: "English" },
  { videoId: "6ZfuNTqbHE8", title: "Avengers Infinity War", thumbnail: "https://img.youtube.com/vi/6ZfuNTqbHE8/sddefault.jpg", channel: "Marvel", publishedAt: "2017-11-29T13:00:00Z", channelId: "UC2", language: "English" },
  { videoId: "d9MyW72ELq0", title: "Avatar The Way of Water", thumbnail: "https://img.youtube.com/vi/d9MyW72ELq0/sddefault.jpg", channel: "20th Century", publishedAt: "2022-05-09T13:00:00Z", channelId: "UC3", language: "English" },
  { videoId: "pBk4NYhWNMM", title: "Barbie", thumbnail: "https://img.youtube.com/vi/pBk4NYhWNMM/sddefault.jpg", channel: "Warner Bros", publishedAt: "2023-04-04T13:00:00Z", channelId: "UC4", language: "English" },
  { videoId: "Way9Dexny3w", title: "Dune Part Two", thumbnail: "https://img.youtube.com/vi/Way9Dexny3w/sddefault.jpg", channel: "Warner Bros", publishedAt: "2023-04-27T13:00:00Z", channelId: "UC5", language: "English" },
  { videoId: "uYPbbksJxIg", title: "Oppenheimer", thumbnail: "https://img.youtube.com/vi/uYPbbksJxIg/sddefault.jpg", channel: "Universal", publishedAt: "2023-05-08T13:00:00Z", channelId: "UC6", language: "English" },
  { videoId: "giXco2jaZ_4", title: "Spider-Man No Way Home", thumbnail: "https://img.youtube.com/vi/giXco2jaZ_4/sddefault.jpg", channel: "Sony Pictures", publishedAt: "2021-08-24T00:00:00Z", channelId: "UC7", language: "English" },
  { videoId: "cqGjhVJWtEg", title: "Spider-Man Across the Spider-Verse", thumbnail: "https://img.youtube.com/vi/cqGjhVJWtEg/sddefault.jpg", channel: "Sony Pictures", publishedAt: "2022-12-13T14:00:00Z", channelId: "UC8", language: "English" },
  { videoId: "qEVUtrk8_B4", title: "John Wick Chapter 4", thumbnail: "https://img.youtube.com/vi/qEVUtrk8_B4/sddefault.jpg", channel: "Lionsgate", publishedAt: "2022-11-10T14:00:00Z", channelId: "UC9", language: "English" },
  { videoId: "_Z3QKkl1WyM", title: "Black Panther Wakanda Forever", thumbnail: "https://img.youtube.com/vi/_Z3QKkl1WyM/sddefault.jpg", channel: "Marvel", publishedAt: "2022-07-23T23:00:00Z", channelId: "UC10", language: "English" },
 
  // MARVEL CINEMATIC UNIVERSE - English
  { videoId: "ZlNFpri-Y40", title: "Ant-Man Quantumania", thumbnail: "https://img.youtube.com/vi/ZlNFpri-Y40/sddefault.jpg", channel: "Marvel", publishedAt: "2022-10-24T13:00:00Z", channelId: "UC11", language: "English" },
  { videoId: "u3V5KDHRQvk", title: "Guardians of the Galaxy Vol 3", thumbnail: "https://img.youtube.com/vi/u3V5KDHRQvk/sddefault.jpg", channel: "Marvel", publishedAt: "2022-12-01T14:00:00Z", channelId: "UC12", language: "English" },
  { videoId: "wS_qbDztgVY", title: "The Marvels", thumbnail: "https://img.youtube.com/vi/wS_qbDztgVY/sddefault.jpg", channel: "Marvel", publishedAt: "2023-05-25T13:00:00Z", channelId: "UC13", language: "English" },
  { videoId: "tgB1wUcmbbw", title: "Thor Love and Thunder", thumbnail: "https://img.youtube.com/vi/tgB1wUcmbbw/sddefault.jpg", channel: "Marvel", publishedAt: "2022-04-18T13:00:00Z", channelId: "UC14", language: "English" },
  { videoId: "aWzlQ2N6qqg", title: "Doctor Strange Multiverse of Madness", thumbnail: "https://img.youtube.com/vi/aWzlQ2N6qqg/sddefault.jpg", channel: "Marvel", publishedAt: "2021-12-22T14:00:00Z", channelId: "UC15", language: "English" },
  { videoId: "8YjFbMbfXaQ", title: "Shang-Chi Legend of Ten Rings", thumbnail: "https://img.youtube.com/vi/8YjFbMbfXaQ/sddefault.jpg", channel: "Marvel", publishedAt: "2021-04-19T13:00:00Z", channelId: "UC16", language: "English" },
  
  // DC UNIVERSE - English
  { videoId: "mqqft2x_Aa4", title: "The Batman", thumbnail: "https://img.youtube.com/vi/mqqft2x_Aa4/sddefault.jpg", channel: "Warner Bros", publishedAt: "2021-10-16T13:00:00Z", channelId: "UC17", language: "English" },
  { videoId: "hebWYacbdvc", title: "The Flash", thumbnail: "https://img.youtube.com/vi/hebWYacbdvc/sddefault.jpg", channel: "Warner Bros", publishedAt: "2023-02-12T14:00:00Z", channelId: "UC18", language: "English" },
  { videoId: "JfVOs4VSpmA", title: "Aquaman Lost Kingdom", thumbnail: "https://img.youtube.com/vi/JfVOs4VSpmA/sddefault.jpg", channel: "Warner Bros", publishedAt: "2023-09-14T13:00:00Z", channelId: "UC19", language: "English" },
  { videoId: "vS3_72Gb-bI", title: "Blue Beetle", thumbnail: "https://img.youtube.com/vi/vS3_72Gb-bI/sddefault.jpg", channel: "Warner Bros", publishedAt: "2023-04-03T13:00:00Z", channelId: "UC20", language: "English" },
  { videoId: "X0tOpBuYasI", title: "Black Adam", thumbnail: "https://img.youtube.com/vi/X0tOpBuYasI/sddefault.jpg", channel: "Warner Bros", publishedAt: "2022-06-08T13:00:00Z", channelId: "UC21", language: "English" },
  
  // ACTION THRILLERS - English
  { videoId: "aOb15GVFZxU", title: "Fast X", thumbnail: "https://img.youtube.com/vi/aOb15GVFZxU/sddefault.jpg", channel: "Universal", publishedAt: "2023-02-10T14:00:00Z", channelId: "UC22", language: "English" },
  { videoId: "avz06PDqDbM", title: "Mission Impossible Dead Reckoning", thumbnail: "https://img.youtube.com/vi/avz06PDqDbM/sddefault.jpg", channel: "Paramount", publishedAt: "2023-05-22T13:00:00Z", channelId: "UC23", language: "English" },
  { videoId: "giXco2jaZ_4", title: "Top Gun Maverick", thumbnail: "https://img.youtube.com/vi/giXco2jaZ_4/sddefault.jpg", channel: "Paramount", publishedAt: "2021-07-18T13:00:00Z", channelId: "UC24", language: "English" },
  { videoId: "BdJKm16Co6M", title: "Transformers Rise of the Beasts", thumbnail: "https://img.youtube.com/vi/BdJKm16Co6M/sddefault.jpg", channel: "Paramount", publishedAt: "2022-12-01T14:00:00Z", channelId: "UC25", language: "English" },
  { videoId: "zAGVQLHvwOY", title: "Extraction 2", thumbnail: "https://img.youtube.com/vi/zAGVQLHvwOY/sddefault.jpg", channel: "Netflix", publishedAt: "2023-05-09T13:00:00Z", channelId: "UC26", language: "English" },
  { videoId: "0IOsk2Vlc4o", title: "Bullet Train", thumbnail: "https://img.youtube.com/vi/0IOsk2Vlc4o/sddefault.jpg", channel: "Sony Pictures", publishedAt: "2022-03-02T14:00:00Z", channelId: "UC27", language: "English" },
  
  // HORROR & THRILLER - English
  { videoId: "BmllggGO4pM", title: "M3GAN", thumbnail: "https://img.youtube.com/vi/BmllggGO4pM/sddefault.jpg", channel: "Universal", publishedAt: "2022-10-11T13:00:00Z", channelId: "UC28", language: "English" },
  { videoId: "QF-oyCwaArU", title: "The Nun II", thumbnail: "https://img.youtube.com/vi/QF-oyCwaArU/sddefault.jpg", channel: "Warner Bros", publishedAt: "2023-06-27T13:00:00Z", channelId: "UC29", language: "English" },
  { videoId: "h74AXqw4Opc", title: "Scream VI", thumbnail: "https://img.youtube.com/vi/h74AXqw4Opc/sddefault.jpg", channel: "Paramount", publishedAt: "2022-11-16T14:00:00Z", channelId: "UC30", language: "English" },
  { videoId: "beToTslH17s", title: "Scream 2022", thumbnail: "https://img.youtube.com/vi/beToTslH17s/sddefault.jpg", channel: "Paramount", publishedAt: "2021-10-12T13:00:00Z", channelId: "UC31", language: "English" },
  { videoId: "yEddsSwweyE", title: "A Haunting in Venice", thumbnail: "https://img.youtube.com/vi/yEddsSwweyE/sddefault.jpg", channel: "20th Century", publishedAt: "2023-06-28T13:00:00Z", channelId: "UC32", language: "English" },
  
  // COMEDY & FAMILY - English
  { videoId: "otNh9bTjXWg", title: "Wonka", thumbnail: "https://img.youtube.com/vi/otNh9bTjXWg/sddefault.jpg", channel: "Warner Bros", publishedAt: "2023-07-11T13:00:00Z", channelId: "UC33", language: "English" },
  { videoId: "TnCa71iUVxA", title: "The Super Mario Bros Movie", thumbnail: "https://img.youtube.com/vi/TnCa71iUVxA/sddefault.jpg", channel: "Illumination", publishedAt: "2022-10-06T13:00:00Z", channelId: "UC34", language: "English" },
  { videoId: "hXzcyx9V0xw", title: "Elemental", thumbnail: "https://img.youtube.com/vi/hXzcyx9V0xw/sddefault.jpg", channel: "Pixar", publishedAt: "2022-11-17T14:00:00Z", channelId: "UC35", language: "English" },
  { videoId: "RqrXhwS33yc", title: "Puss in Boots The Last Wish", thumbnail: "https://img.youtube.com/vi/RqrXhwS33yc/sddefault.jpg", channel: "DreamWorks", publishedAt: "2022-06-28T13:00:00Z", channelId: "UC36", language: "English" },
  { videoId: "IiMinixSXII", title: "Dungeons Dragons Honor Among Thieves", thumbnail: "https://img.youtube.com/vi/IiMinixSXII/sddefault.jpg", channel: "Paramount", publishedAt: "2022-12-01T14:00:00Z", channelId: "UC37", language: "English" },
  
  // DRAMA & PRESTIGE - English
  { videoId: "8g18jFHCLXk", title: "Killers of the Flower Moon", thumbnail: "https://img.youtube.com/vi/8g18jFHCLXk/sddefault.jpg", channel: "Apple TV", publishedAt: "2023-05-17T13:00:00Z", channelId: "UC38", language: "English" },
  { videoId: "PfBVIHgQbYk", title: "The Fabelmans", thumbnail: "https://img.youtube.com/vi/PfBVIHgQbYk/sddefault.jpg", channel: "Universal", publishedAt: "2022-09-10T13:00:00Z", channelId: "UC39", language: "English" },
  { videoId: "wxN1T1uxQ2g", title: "Everything Everywhere All at Once", thumbnail: "https://img.youtube.com/vi/wxN1T1uxQ2g/sddefault.jpg", channel: "A24", publishedAt: "2022-02-24T14:00:00Z", channelId: "UC40", language: "English" },
  
  // INTERNATIONAL BOLLYWOOD (HINDI)
  { videoId: "vqu4z34wENw", title: "Pathaan", thumbnail: "https://img.youtube.com/vi/vqu4z34wENw/sddefault.jpg", channel: "YRF", publishedAt: "2023-01-10T07:00:00Z", channelId: "UC41", language: "Hindi" },
  { videoId: "COv52Qyctws", title: "Jawan", thumbnail: "https://img.youtube.com/vi/COv52Qyctws/sddefault.jpg", channel: "Red Chillies", publishedAt: "2023-08-31T06:00:00Z", channelId: "UC43", language: "Hindi" },
  { videoId: "JbyyhK4E-AM", title: "Animal", thumbnail: "https://assets.gadgets360cdn.com/pricee/assets/product/202301/Animal_1673270841.jpg", channel: "T-Series", publishedAt: "2023-11-16T07:00:00Z", channelId: "UC55", language: "Tamil" },
  
  // TELUGU CINEMA
  { videoId: "f_vbAtFSEc0", title: "RRR", thumbnail: "https://img.youtube.com/vi/f_vbAtFSEc0/sddefault.jpg", channel: "DVV Entertainment", publishedAt: "2021-11-01T07:30:00Z", channelId: "UC42", language: "Telugu" },
  { videoId: "HtmlDoXttNg", title: "Pushpa The Rise", thumbnail: "https://m.media-amazon.com/images/M/MV5BNWU1ZWFhNGQtZDhlZC00ZWFlLTlmNmEtN2VmYmZiN2Y5ZmQ2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", channel: "Mythri", publishedAt: "2021-08-13T07:00:00Z", channelId: "UC56", language: "Tamil" },
  
  // TAMIL CINEMA
  { videoId: "JKa05nyUmuQ", title: "KGF Chapter 2", thumbnail: "https://img.youtube.com/vi/JKa05nyUmuQ/sddefault.jpg", channel: "Hombale Films", publishedAt: "2022-03-27T07:00:00Z", channelId: "UC54", language: "Tamil" },
];

export const fetchTrailers = async (query, pageToken = "", maxResults = 20) => {
  try {
    // Return a subset of trailers, shuffled for variety
    const shuffled = [...MOCK_TRAILERS].sort(() => 0.5 - Math.random());
    const results = shuffled.slice(0, Math.min(maxResults, MOCK_TRAILERS.length));
    
    console.log(`Returning ${results.length} trailers for query: "${query}"`);
    return results;
  } catch (error) {
    console.error("Error in fetchTrailers:", error.message);
    return MOCK_TRAILERS.slice(0, maxResults);
  }
};

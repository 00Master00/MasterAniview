import { Anime } from '@/types/anime';
import sampleAnime1 from '@/assets/sample-anime-1.jpg';
import sampleAnime2 from '@/assets/sample-anime-2.jpg';
import sampleAnime3 from '@/assets/sample-anime-3.jpg';
import sampleAnime4 from '@/assets/sample-anime-4.jpg';

export const mockAnimeData: Anime[] = [
  {
    id: '1',
    title: 'Mystic Chronicles',
    description: 'A thrilling adventure following a young sorceress as she discovers her magical powers and fights against dark forces threatening her world.',
    image: sampleAnime1,
    genres: ['Fantasy', 'Adventure', 'Magic'],
    publisher: 'Studio Mystic',
    first: '2024-01-15',
    format: 'TV Series',
    popularity: 1,
    lastUpdate: '2024-01-20',
    updateDay: 'Su'
  },
  {
    id: '2',
    title: 'Azure Legends',
    description: 'Epic tale of warriors wielding elemental powers in a world where magic and technology collide in spectacular battles.',
    image: sampleAnime2,
    genres: ['Action', 'Fantasy', 'Drama'],
    publisher: 'Azure Animation',
    first: '2024-02-01',
    format: 'Movie',
    popularity: 2,
    lastUpdate: '2024-01-19',
    updateDay: 'M'
  },
  {
    id: '3',
    title: 'Crimson Destiny',
    description: 'A warrior\'s journey to master ancient fighting techniques while protecting his homeland from invasion.',
    image: sampleAnime3,
    genres: ['Action', 'Martial Arts', 'Adventure'],
    publisher: 'Crimson Studios',
    first: '2024-01-30',
    format: 'TV Series',
    popularity: 3,
    lastUpdate: '2024-01-21',
    updateDay: 'Tu'
  },
  {
    id: '4',
    title: 'Kawaii Dreams',
    description: 'Heartwarming slice-of-life story about friendship, dreams, and the everyday magic found in ordinary moments.',
    image: sampleAnime4,
    genres: ['Slice of Life', 'Comedy', 'Romance'],
    publisher: 'Dreamland Animation',
    first: '2024-02-10',
    format: 'TV Series',
    popularity: 4,
    lastUpdate: '2024-01-18',
    updateDay: 'W'
  },
  {
    id: '5',
    title: 'Shadow Realm',
    description: 'Dark fantasy exploring the boundaries between reality and nightmare as heroes venture into forbidden dimensions.',
    image: sampleAnime1,
    genres: ['Dark Fantasy', 'Horror', 'Supernatural'],
    publisher: 'Shadow Productions',
    first: '2024-01-25',
    format: 'OVA',
    popularity: 5,
    lastUpdate: '2024-01-17',
    updateDay: 'Th'
  },
  {
    id: '6',
    title: 'Neon Tokyo 2099',
    description: 'Cyberpunk adventure in a futuristic Tokyo where hackers and androids fight for freedom in a digital world.',
    image: sampleAnime2,
    genres: ['Cyberpunk', 'Sci-Fi', 'Action'],
    publisher: 'Neon Studios',
    first: '2024-02-05',
    format: 'TV Series',
    popularity: 6,
    lastUpdate: '2024-01-22',
    updateDay: 'F'
  },
  {
    id: '7',
    title: 'Dragon Heart Academy',
    description: 'School life meets fantasy as students learn to bond with dragons and master elemental magic.',
    image: sampleAnime3,
    genres: ['School', 'Fantasy', 'Adventure'],
    publisher: 'Academy Animation',
    first: '2024-01-20',
    format: 'TV Series',
    popularity: 7,
    lastUpdate: '2024-01-16',
    updateDay: 'Sa'
  },
  {
    id: '8',
    title: 'Starlight Melody',
    description: 'Musical adventure about aspiring idols who discover their songs have the power to heal hearts and save the world.',
    image: sampleAnime4,
    genres: ['Music', 'Romance', 'Supernatural'],
    publisher: 'Melody Works',
    first: '2024-02-15',
    format: 'Movie',
    popularity: 8,
    lastUpdate: '2024-01-15',
    updateDay: 'Su'
  },
  {
    id: '9',
    title: 'Phantom Hunters',
    description: 'Supernatural thriller following a team of investigators who hunt ghosts and other paranormal entities.',
    image: sampleAnime1,
    genres: ['Supernatural', 'Thriller', 'Action'],
    publisher: 'Phantom Studios',
    first: '2024-01-12',
    format: 'TV Series',
    popularity: 9,
    lastUpdate: '2024-01-14',
    updateDay: 'M'
  },
  {
    id: '10',
    title: 'Royal Guardians',
    description: 'Medieval fantasy about knights protecting a magical kingdom from dark forces while uncovering ancient mysteries.',
    image: sampleAnime2,
    genres: ['Medieval', 'Fantasy', 'Action'],
    publisher: 'Royal Animation',
    first: '2024-01-08',
    format: 'TV Series',
    popularity: 10,
    lastUpdate: '2024-01-13',
    updateDay: 'Tu'
  }
];

export const genresList = [
  'All',
  'Action',
  'Adventure',
  'Comedy', 
  'Drama',
  'Fantasy',
  'Horror',
  'Romance',
  'Sci-Fi',
  'Slice of Life',
  'Supernatural',
  'Thriller'
];

export const formatsList = [
  'All',
  'TV Series',
  'Movie',
  'OVA',
  'Special'
];
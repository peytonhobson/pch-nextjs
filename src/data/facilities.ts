export interface Facility {
  id: number
  name: string
  summary: string
  description: string
  images: string[]
  location: string
}

export const facilities = [
  {
    id: 1,
    name: 'Baxter',
    summary:
      'This serene and flawless affiliated home is located in the West Bennett Park neighborhood in Southeast Salem.',
    description:
      'This serene and flawless affiliated home is located in the West Bennett Park neighborhood in Southeast Salem.',
    images: [
      'https://premier-care-homes.s3.amazonaws.com/assets/baxter/Baxter-fpo.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/baxter/baxter-1.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/baxter/baxter-2.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/baxter/baxter-3.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/baxter/baxter-4.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/baxter/baxter-5.jpg'
    ],
    location:
      'https://maps.google.com/maps?q=2336%20Baxter%20Rd%20SE&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  {
    id: 2,
    name: 'Hallet',
    summary:
      'This one-level home provides a small intimate setting with a private bedroom afforded to each of the five residents. ',
    description:
      'Located in a beautiful West Salem neighborhood, this home is secure and pristine. This one-level home provides a small intimate setting with a private bedroom afforded to each of the five residents.<br><br>For daily living and activities, the communal space is a large light-filled area. The private, well-kept grounds and patio allow residents to enjoy the tranquillity of the outdoors.',
    images: [
      'https://premier-care-homes.s3.amazonaws.com/assets/hallet/hallet-7.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/hallet/hallet-1.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/hallet/hallet-2.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/hallet/hallet-3.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/hallet/hallet-4.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/hallet/hallet-5.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/hallet/hallet-6.jpg'
    ],
    location:
      'https://maps.google.com/maps?q=1548%20Hallet%20Ct.%20NW&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  {
    id: 3,
    name: 'Madrona',
    summary:
      'Our comfortable immaculate home is located in the delightful Laurel Springs neighborhood in South Salem. ',
    description:
      'Our comfortable immaculate home is located in the delightful Laurel Springs neighborhood in South Salem. This one-level home provides a small intimate setting with a private bedroom afforded to each of the five residents.<br><br>For daily living and activities, the communal space is a large light-filled area. The private, well-kept grounds and patio allow residents to enjoy the tranquillity of the outdoors.',
    images: [
      'https://premier-care-homes.s3.amazonaws.com/assets/madrona/madrona-house-3.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/madrona/madrona-house-2.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/madrona/madrona-house-1.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/madrona/madrona-1.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/madrona/madrona-2.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/madrona/madrona-3.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/madrona/madrona-4.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/madrona/madrona-5.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/madrona/madrona-6.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/madrona/madrona-7.jpg'
    ],
    location:
      'https://maps.google.com/maps?q=1270%20Madrona%20Ave%20S&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  {
    id: 4,
    name: 'Trapper',
    summary:
      'This comfortable and impeccable home is located in a beautiful Northeast Salem neighborhood near Chemeketa Community College. ',
    description:
      'This comfortable and impeccable home is located in a beautiful Northeast Salem neighborhood near Chemeketa Community College. This one-level home provides a small intimate setting with a private bedroom afforded to each of the five residents.<br><br>For daily living and activities, the communal space is a large light-filled area. The private, well-kept grounds and patio allow residents to enjoy the tranquillity of the outdoors.',
    images: [
      'https://premier-care-homes.s3.amazonaws.com/assets/trapper/trapper-1.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/trapper/trapper-2.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/trapper/trapper-3.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/trapper/trapper-4.jpg',
      'https://premier-care-homes.s3.amazonaws.com/assets/trapper/trapper-5.jpg'
    ],
    location:
      'https://maps.google.com/maps?q=4322%20Trapper%20Dr%20NE,%20Salem,%20OR&t=&z=13&ie=UTF8&iwloc=&output=embed'
  }
] as const satisfies Facility[]

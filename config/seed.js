const Landscape = require('../models/landscape');
const Comment   = require('../models/comment');
const User      = require('../models/user');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const userIdOne = new ObjectId();
const userIdTwo = new ObjectId();

let users = [{
    _id: userIdOne,
    email: 'seed@email.com',
    username: 'Seed',
    password: 'password',
    fullname: 'Seed User',
    aboutme: 'Brief description',
    provider: 'local',
    avatar: {
      id: 'myland/avatar/default-avatar',
      content: 'https://res.cloudinary.com/cristian7x/image/upload/v1541567697/myland/avatar/default-avatar.png'
    },
    isAdmin: false
  }, {
    _id: userIdTwo,
    email: 'admin@email.com',
    username: 'admin',
    password: 'password',
    fullname: 'Administrator',
    aboutme: 'Brief description',
    provider: 'local',
    avatar: {
      id: 'myland/avatar/default-avatar',
      content: 'https://res.cloudinary.com/cristian7x/image/upload/v1541567697/myland/avatar/default-avatar.png'
    },
    isAdmin: true
  }];

let landscapes = [
  {
    name : "Snowdonia",
    image : {
      id: 'myland/landscape/landscape1',
      content: 'https://res.cloudinary.com/cristian7x/image/upload/v1537554208/myland/landscape/landscape1.jpg'
    },
    entranceFee : '',
    description : "This rural landscape of hills and valleys is viewed from atop Mount Snowdon, the highest peak in Wales, United Kingdom. This area of Wales is known as Snowdonia, and is dominated by Snowdonia National Park. Snowdonia National Park is 2,170 square kilometers (838 square miles).",
    location: 'Snowdonia, Wales',
    lat: 52.407511,
    lng: -3.690216,
    createdAt: Date.now(),
    author: {
      id: userIdOne,
      username: 'Seed'
    }
  },
  {
    name : "Mt. Bromo",
    image : {
      id: 'myland/landscape/landscape2',
      content: 'https://res.cloudinary.com/cristian7x/image/upload/v1537554215/myland/landscape/landscape2.jpg'
    },
    entranceFee : '',
    description : 'Sunrise over the Erta Ale lava lake created a dramatic dichotomy between the power and intimidation of the angry volcano and the childlike innocence of a dancing stick-figure. The spewing and showering of molten lava, the charred, cracking of the newly formed black basalt, and the fiery sunset within the sulfuric haze created for a dramatic, ethereal experience akin to a "gateway to hell." The volcano had erupted only three weeks before this image was taken.',
    location: 'Mount Bromo, Indonesia',
    lat: -2.279866,
    lng: 117.369878,
    createdAt: Date.now(),
    author: {
      id: userIdOne,
      username: 'Seed'
    }
  },
  {
    name : "Machu Picchu",
    image : {
      id: 'myland/landscape/landscape3',
      content: 'https://res.cloudinary.com/cristian7x/image/upload/v1541570928/myland/landscape/landscape3.jpg'
    },
    entranceFee : '25.9',
    description : "Machu Picchu was an Incan retreat for its emperor. Machu Picchu is a 15th-century Inca site located on a ridge between the Huayna Picchu and Machu Picchu mountains in Peru. It sits 7,970 feet (2,430 meters) above sea level on the eastern slope of the Andes and overlooks the Urubamba River hundreds of feet below.",
    location: 'Machu Picchu, Peru',
    lat: -13.2015,
    lng: -72.5002,
    createdAt: Date.now(),
    author: {
      id: userIdOne,
      username: 'Seed'
    }
  },
  {
    name : "Brice Canyon Hoodoos",
    image : {
      id: 'myland/landscape/landscape4',
      content: 'https://res.cloudinary.com/cristian7x/image/upload/v1541570948/myland/landscape/landscape4.jpg'
    },
    entranceFee : '20',
    description : "The landscape of Bryce Canyon, Utah, is dominated by hoodoos. Hoodoos are rock formations formed as ice and rainwater erode soft rock. In Bryce Canyon, the soft rock is sandstone. A hoodoo landscape is not unique to Bryce Canyon, however. Hoodoos are also part of the landscape in Cappadocia, Turkey, and Wanli, Taiwan.",
    location: 'Brice Canyon, Utah, USA',
    lat: 39.515509,
    lng: -111.549668,
    createdAt: Date.now(),
    author: {
      id: userIdOne,
      username: 'Seed'
    }
  }
];

async function seedDB(){
  try {
    await User.deleteMany({});
    console.log("Users deleted!");
    await Landscape.deleteMany({});
    console.log("Landscapes deleted!");
    await Comment.deleteMany({});
    console.log("Comments deleted!");

    // Seed Data   
    for(const user of users) {
      await User.create(user);
      console.log("User was created!");
    }   
    
    for(const seed of landscapes){
      let landscape = await Landscape.create(seed);
      console.log("Landscape was created!");
      let commentA = await Comment.create({
        text: 'This is a test comment 1',
        createdAt: Date.now(),
        author: {
          id: userIdOne,
          username: 'Seed'
        }
      });
      console.log("Comment A was created!");
      let commentB = await Comment.create({
        text: 'This is a test comment 2',
        createdAt: Date.now(),
        author: {
          id: userIdOne,
          username: 'Seed'
        }
      });
      console.log("Comment B was created!");
      landscape.comments.push(commentA);
      landscape.comments.push(commentB);
      landscape.save();
      console.log("Comments added to landscape");     
    }  
  } catch (error) {
    console.log(error);
  }
}

module.exports = seedDB;
///❗❗❗READ❗❗❗ FARHANA, add the images in the folder: Documents > Codex > 2026-11-02 > Bu > public > us   IMPORTANT ❗❗❗❗❗❗❗

// Edit this file to personalise the quiz. `correct` is the option index (0–3).
export const questions = [
  { question: 'Which animal once sneezed violently on Farhana as kid?', options: ['Donkey', 'Horse', 'Cat', 'Dog'], correct: 1 },
  { question: 'What vehicle did dad promise to buy Furu Bhai growing up ?', options: ['Helicopter', 'Motorbike', 'Funeral car', 'Boat'], correct: 0 },
  { question: 'At what age did Farhana stop being bald?', options: ['1', '2', '3', '4'], correct: 2 },
  { 
    question: 'Which photo is of Tahmeed?', 
    options: [
      'us/tahmeed-1.jpeg', 
      'us/tahmeed-2.jpeg', 
      'us/tahmeed-3.jpeg', 
      'us/tahmeed-4.jpeg'
    ], 
    correct: 1, // 0 = top left, 1 = top right, 2 = bottom left and 3 = bottom right
    isImageOptions: true // Flag to trigger image rendering in the UI
  },
  { question: 'Which device did Mezo bhai once steal as a kid?', options: ['Nokia phone', 'MP3 Player', 'MP4 Player', 'Blackberry'], correct: 2 },
  { question: 'Which nickname was Rukshana given as a child to prevent her from knowing that she was being talked about?', options: ['Roundabout', 'Fire engine', 'Dual carriageway', 'Bus stop'], correct: 3 },
  { question: 'Which fictional setting did Boro bhai and Mezo bhai supposedely go to growing up?', options: ['Hogwarts', 'Narnia', 'Neverland', 'Far Far Away'], correct: 0 },
  { question: 'In the Eastenders remake, what character did Boro bhai play?', options: ['Ian Beale', 'Peggy', 'Phil Mitchell', 'Tamwar'], correct: 2 },
  { question: 'Which item did Furu Bhai once throw out the window?', options: ['Rug', 'Rukshanas laptop', 'Bathroom tap', 'Toilet seat'], correct: 2 },
  { 
    question: 'Which one is Farhana?', 
    options: [
      'us/farhana-1.jpeg', 
      'us/farhana-2.jpeg', 
      'us/farhana-3.jpeg', 
      'us/farhana-4.jpeg'
    ], 
    correct: 3, // 0 = top left, 1 = top right, 2 = bottom left and 3 = bottom right
    isImageOptions: true // Flag to trigger image rendering in the UI
  },
  { question: 'Which sibling did Farhana once push down the stairs as a kid?', options: ['Boro bhai', 'Mezo bhai', 'Furu bhai', 'Rukshana'], correct: 2 },
  { question: 'Which event once made Farhana poo her pants as a child?', options: ['Fireworks', 'Thunder', 'Power cut', 'Nightmare'], correct: 0 },
]

// Replace `src` with your own files from /public, e.g. '/scans/scan-1.jpg'.
export const journey = [
  { date: 'The First Scan', title: 'Week 7', src: 'scans/scan-1.jpeg', caption: '6th August' },
  { date: 'The 2nd Scan', title: 'Week 12', src: 'scans/scan-2.jpeg', caption: '11th September' },
  { date: 'The 3rd Scan', title: 'Week 16', src: 'scans/scan-3.jpeg', caption: '8th October' },
  { date: 'The Final Scan', title: 'Week 20', src: 'scans/scan-4.jpeg', caption: '2nd November' }
]

// Replace with your final chosen image, e.g. '/final-reveal.jpg'.
export const finalImage = 'final-reveal.jpeg'

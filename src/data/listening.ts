// Bài luyện "Nghe hiểu": mỗi bài có 1 đoạn văn ngắn (app đọc to bằng TTS),
// bé nghe rồi trả lời câu hỏi trắc nghiệm bên dưới — không hiện sẵn chữ để
// đúng nghĩa "nghe hiểu" (chỉ hiện lại đoạn văn sau khi đã nộp bài, để ôn
// lại). Nội dung tự viết, đơn giản, phù hợp học sinh tiểu học.

export interface ListeningQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface ListeningLesson {
  id: string;
  title: string;
  level: string;
  passage: string;
  questions: ListeningQuestion[];
}

export const listeningLessons: ListeningLesson[] = [
  {
    id: "l1-my-family",
    title: "My Family",
    level: "Cấp 1 — Dễ nhất",
    passage:
      "I have a big family. My father is a doctor. My mother is a teacher. I have one brother and one sister. We live in a small house near the park.",
    questions: [
      {
        question: "What is the father's job?",
        options: ["Doctor", "Teacher", "Driver"],
        correctIndex: 0,
      },
      {
        question: "How many sisters does the speaker have?",
        options: ["Two", "One", "None"],
        correctIndex: 1,
      },
      {
        question: "Where is their house?",
        options: ["Near the school", "Near the park", "Near the beach"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l1-my-pet-dog",
    title: "My Pet Dog",
    level: "Cấp 1 — Dễ nhất",
    passage:
      "I have a pet dog. His name is Max. Max is brown and white. He likes to run in the garden. Every morning, I give him food and water. Max is very happy when I come home from school.",
    questions: [
      {
        question: "What color is Max?",
        options: ["Black", "Brown and white", "Grey"],
        correctIndex: 1,
      },
      {
        question: "Where does Max like to run?",
        options: ["In the garden", "In the kitchen", "In the car"],
        correctIndex: 0,
      },
      {
        question: "When is Max happy?",
        options: ["When I sleep", "When I come home from school", "When it rains"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l1-rainy-day",
    title: "A Rainy Day",
    level: "Cấp 1 — Dễ nhất",
    passage:
      "Today it is raining. The sky is grey. I cannot play outside. I stay at home and read a book. My mother makes hot tea. I like rainy days because I can rest.",
    questions: [
      {
        question: "What is the weather like today?",
        options: ["Sunny", "Rainy", "Snowy"],
        correctIndex: 1,
      },
      {
        question: "What does the speaker do at home?",
        options: ["Reads a book", "Plays football", "Goes swimming"],
        correctIndex: 0,
      },
      {
        question: "What does mother make?",
        options: ["Hot tea", "Ice cream", "Bread"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "l1-my-school-day",
    title: "My School Day",
    level: "Cấp 1 — Dễ nhất",
    passage:
      "I go to school every morning. My school starts at seven o'clock. I study math, English, and art. At lunch, I eat rice and vegetables. After school, I play with my friends.",
    questions: [
      {
        question: "What time does school start?",
        options: ["Six o'clock", "Seven o'clock", "Eight o'clock"],
        correctIndex: 1,
      },
      {
        question: "What does the speaker eat at lunch?",
        options: ["Rice and vegetables", "Bread and milk", "Noodles and fish"],
        correctIndex: 0,
      },
      {
        question: "What does the speaker do after school?",
        options: ["Sleeps", "Plays with friends", "Watches TV"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l2-the-zoo",
    title: "The Zoo",
    level: "Cấp 2 — Dễ",
    passage:
      "Last weekend, I went to the zoo with my family. We saw elephants, lions, and monkeys. The monkeys were very funny. I liked the elephants the most because they are big and gentle. We had a great day.",
    questions: [
      {
        question: "Who did the speaker go to the zoo with?",
        options: ["Friends", "Family", "Teacher"],
        correctIndex: 1,
      },
      {
        question: "Which animal did the speaker like the most?",
        options: ["Lions", "Monkeys", "Elephants"],
        correctIndex: 2,
      },
      {
        question: "How were the monkeys?",
        options: ["Funny", "Scary", "Sleepy"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "l2-birthday-party",
    title: "My Birthday Party",
    level: "Cấp 2 — Dễ",
    passage:
      "Yesterday was my birthday. My friends came to my house. We ate cake and ice cream. I got many presents. My favorite present was a red bicycle. It was a wonderful day.",
    questions: [
      {
        question: "What did they eat?",
        options: ["Cake and ice cream", "Pizza and soda", "Soup and bread"],
        correctIndex: 0,
      },
      {
        question: "What was the favorite present?",
        options: ["A book", "A red bicycle", "A toy car"],
        correctIndex: 1,
      },
      {
        question: "When was the birthday?",
        options: ["Today", "Tomorrow", "Yesterday"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "l2-class-pet",
    title: "Our Class Pet",
    level: "Cấp 2 — Dễ",
    passage:
      "Our class has a pet rabbit. Its name is Snowy. Snowy is white and soft. Every day, one student feeds Snowy carrots. On Friday, it is my turn to feed Snowy. I am very excited.",
    questions: [
      {
        question: "What is the pet's name?",
        options: ["Snowy", "Fluffy", "Max"],
        correctIndex: 0,
      },
      {
        question: "What does the class feed the rabbit?",
        options: ["Grass", "Carrots", "Bread"],
        correctIndex: 1,
      },
      {
        question: "When is it the speaker's turn?",
        options: ["Monday", "Friday", "Sunday"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l2-at-the-park",
    title: "At the Park",
    level: "Cấp 2 — Dễ",
    passage:
      "On Sunday, my brother and I went to the park. We flew a kite. The wind was strong, so the kite flew very high. Then we played on the swings. We had a lot of fun.",
    questions: [
      {
        question: "What did they fly?",
        options: ["A kite", "A ball", "A plane"],
        correctIndex: 0,
      },
      {
        question: "Why did the kite fly high?",
        options: ["It was small", "The wind was strong", "It was heavy"],
        correctIndex: 1,
      },
      {
        question: "What did they play after that?",
        options: ["Swings", "Slides", "Football"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "l3-favorite-food",
    title: "My Favorite Food",
    level: "Cấp 3 — Trung bình",
    passage:
      "My favorite food is fried rice. My mother cooks it with eggs, carrots, and peas. It smells very good. I eat it every Sunday. Sometimes I help my mother cook it too.",
    questions: [
      {
        question: "What is the speaker's favorite food?",
        options: ["Noodles", "Fried rice", "Soup"],
        correctIndex: 1,
      },
      {
        question: "What is in the fried rice?",
        options: ["Eggs, carrots, and peas", "Fish and bread", "Chicken and cheese"],
        correctIndex: 0,
      },
      {
        question: "When does the speaker eat it?",
        options: ["Every Monday", "Every Sunday", "Every day"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l3-four-seasons",
    title: "The Four Seasons",
    level: "Cấp 3 — Trung bình",
    passage:
      "There are four seasons in a year. In spring, flowers bloom. In summer, the weather is hot. In autumn, leaves fall from the trees. In winter, it is cold, and sometimes it snows. I like summer best because I can go swimming.",
    questions: [
      {
        question: "What happens in spring?",
        options: ["Flowers bloom", "Leaves fall", "It snows"],
        correctIndex: 0,
      },
      {
        question: "What season does the speaker like best?",
        options: ["Winter", "Summer", "Autumn"],
        correctIndex: 1,
      },
      {
        question: "What happens in winter?",
        options: ["It is hot", "Flowers bloom", "It is cold"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "l3-new-shoes",
    title: "My New Shoes",
    level: "Cấp 3 — Trung bình",
    passage:
      "Today my mother bought me new shoes. They are blue and white. They are very comfortable. I wore them to school. My friends said they looked nice. I feel very happy.",
    questions: [
      {
        question: "What color are the new shoes?",
        options: ["Blue and white", "Red and black", "Green and yellow"],
        correctIndex: 0,
      },
      {
        question: "Who bought the shoes?",
        options: ["Father", "Mother", "Grandmother"],
        correctIndex: 1,
      },
      {
        question: "Where did the speaker wear the shoes?",
        options: ["To the park", "To school", "To bed"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l3-helping-at-home",
    title: "Helping at Home",
    level: "Cấp 3 — Trung bình",
    passage:
      "Every evening, I help my parents at home. I clean my room and wash the dishes. My brother waters the plants. We finish our chores before dinner. Then we watch television together.",
    questions: [
      {
        question: "What does the speaker do?",
        options: ["Clean the room and wash dishes", "Cook dinner", "Wash the car"],
        correctIndex: 0,
      },
      {
        question: "What does the brother do?",
        options: ["Cleans the room", "Waters the plants", "Washes the dishes"],
        correctIndex: 1,
      },
      {
        question: "When do they watch television?",
        options: ["Before chores", "After dinner starts", "After finishing chores"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "l4-trip-to-beach",
    title: "A Trip to the Beach",
    level: "Cấp 4 — Khó",
    passage:
      "Last summer, my family went to the beach. The sand was warm, and the sea was blue. I built a sandcastle with my sister. We swam in the sea and ate ice cream. It was a perfect day.",
    questions: [
      {
        question: "What did the speaker build?",
        options: ["A sandcastle", "A tower", "A boat"],
        correctIndex: 0,
      },
      {
        question: "What did they eat?",
        options: ["Ice cream", "Candy", "Cake"],
        correctIndex: 0,
      },
      {
        question: "What color was the sea?",
        options: ["Green", "Blue", "Grey"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l4-best-friend",
    title: "My Best Friend",
    level: "Cấp 4 — Khó",
    passage:
      "My best friend is Linh. She is kind and funny. We sit next to each other in class. We like to draw pictures together. On weekends, we often play badminton in the yard.",
    questions: [
      {
        question: "What is the friend's name?",
        options: ["Linh", "Mai", "Hoa"],
        correctIndex: 0,
      },
      {
        question: "What do they like to do together?",
        options: ["Draw pictures", "Sing songs", "Cook food"],
        correctIndex: 0,
      },
      {
        question: "What do they play on weekends?",
        options: ["Football", "Badminton", "Chess"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l4-lost-cat",
    title: "The Lost Cat",
    level: "Cấp 4 — Khó",
    passage:
      "Yesterday, our neighbor's cat was lost. Its name is Tom. We looked for Tom all afternoon. Finally, we found him under a car. Tom was safe and happy. Our neighbor thanked us very much.",
    questions: [
      {
        question: "What was lost?",
        options: ["A dog", "A cat", "A bird"],
        correctIndex: 1,
      },
      {
        question: "Where did they find Tom?",
        options: ["Under a car", "In a tree", "In the kitchen"],
        correctIndex: 0,
      },
      {
        question: "How did the neighbor feel?",
        options: ["Angry", "Thankful", "Sad"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l4-morning-routine",
    title: "My Morning Routine",
    level: "Cấp 4 — Khó",
    passage:
      "I wake up at six thirty every morning. First, I brush my teeth and wash my face. Then I eat breakfast with my family. After that, I get dressed and go to school. I never forget my school bag.",
    questions: [
      {
        question: "What time does the speaker wake up?",
        options: ["Six o'clock", "Six thirty", "Seven o'clock"],
        correctIndex: 1,
      },
      {
        question: "What does the speaker do first?",
        options: ["Eat breakfast", "Brush teeth and wash face", "Get dressed"],
        correctIndex: 1,
      },
      {
        question: "What must the speaker never forget?",
        options: ["Umbrella", "School bag", "Water bottle"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l5-farm-visit",
    title: "The Farm Visit",
    level: "Cấp 5 — Khó nhất",
    passage:
      "Last week, our class visited a farm. We saw cows, chickens, and pigs. The farmer showed us how to feed the chickens. I was a little scared of the cows at first, but they were gentle. It was an interesting trip.",
    questions: [
      {
        question: "Where did the class go?",
        options: ["A zoo", "A farm", "A museum"],
        correctIndex: 1,
      },
      {
        question: "What did the farmer teach them?",
        options: ["How to milk cows", "How to feed the chickens", "How to plant rice"],
        correctIndex: 1,
      },
      {
        question: "How did the speaker feel about the cows at first?",
        options: ["Excited", "Bored", "A little scared"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "l5-favorite-season",
    title: "My Favorite Season",
    level: "Cấp 5 — Khó nhất",
    passage:
      "I like autumn the most. The weather is cool, and the sky is clear. The leaves turn yellow and red. I enjoy walking in the park and collecting colorful leaves. Autumn makes me feel calm and happy.",
    questions: [
      {
        question: "Which season does the speaker like?",
        options: ["Spring", "Autumn", "Winter"],
        correctIndex: 1,
      },
      {
        question: "What color do the leaves turn?",
        options: ["Green and blue", "Yellow and red", "Black and white"],
        correctIndex: 1,
      },
      {
        question: "What does the speaker collect?",
        options: ["Flowers", "Colorful leaves", "Stones"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l5-no-electricity",
    title: "A Day Without Electricity",
    level: "Cấp 5 — Khó nhất",
    passage:
      "Last night, there was no electricity in our house. It was very dark. My father lit some candles. We sat together and told stories. Even though it was strange, it was a fun evening.",
    questions: [
      {
        question: "What happened last night?",
        options: ["It rained", "There was no electricity", "The house was very hot"],
        correctIndex: 1,
      },
      {
        question: "What did the father do?",
        options: ["Called for help", "Lit some candles", "Went outside"],
        correctIndex: 1,
      },
      {
        question: "How did the family spend the evening?",
        options: ["They slept early", "They told stories", "They watched television"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l5-learning-to-swim",
    title: "Learning to Swim",
    level: "Cấp 5 — Khó nhất",
    passage:
      "This summer, I am learning to swim. My teacher is very patient. At first, I was afraid of the water. Now, I can swim a little by myself. I practice every Saturday morning. I hope to swim very well soon.",
    questions: [
      {
        question: "What is the speaker learning?",
        options: ["To swim", "To ride a bike", "To dance"],
        correctIndex: 0,
      },
      {
        question: "How did the speaker feel about water at first?",
        options: ["Excited", "Afraid", "Bored"],
        correctIndex: 1,
      },
      {
        question: "When does the speaker practice?",
        options: ["Every Saturday morning", "Every Friday evening", "Every day"],
        correctIndex: 0,
      },
    ],
  },
];

export function findListeningLesson(id: string): ListeningLesson | undefined {
  return listeningLessons.find((l) => l.id === id);
}

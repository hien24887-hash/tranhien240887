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

  // ---------------------------------------------------------------------
  // Bổ sung thêm 50 bài (10 bài / cấp độ)
  // ---------------------------------------------------------------------
  {
    id: "l1-my-bedroom",
    title: "My Bedroom",
    level: "Cấp 1 — Dễ nhất",
    passage:
      "I have a small bedroom. My bed is blue. I have a desk and a chair. On the wall, there is a picture of a cat. I like my bedroom because it is cozy.",
    questions: [
      { question: "What color is the bed?", options: ["Blue", "Red", "Green"], correctIndex: 0 },
      {
        question: "What is on the wall?",
        options: ["A picture of a dog", "A picture of a cat", "A clock"],
        correctIndex: 1,
      },
      {
        question: "Why does the speaker like the bedroom?",
        options: ["It is big", "It is cozy", "It is new"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l1-favorite-color",
    title: "My Favorite Color",
    level: "Cấp 1 — Dễ nhất",
    passage:
      "My favorite color is yellow. I like yellow because it looks like the sun. My bag is yellow. My shoes are yellow too. My friend likes blue, not yellow.",
    questions: [
      {
        question: "What is the speaker's favorite color?",
        options: ["Blue", "Yellow", "Green"],
        correctIndex: 1,
      },
      {
        question: "Why does the speaker like this color?",
        options: ["It looks like the sun", "It looks like the sea", "It looks like grass"],
        correctIndex: 0,
      },
      { question: "What color does the friend like?", options: ["Yellow", "Blue", "Red"], correctIndex: 1 },
    ],
  },
  {
    id: "l1-weather-today",
    title: "The Weather Today",
    level: "Cấp 1 — Dễ nhất",
    passage:
      "Today the sun is shining. The sky is blue. It is warm outside. I wear a hat and short pants. My friends and I play football in the yard.",
    questions: [
      { question: "What is the sky like today?", options: ["Grey", "Blue", "Dark"], correctIndex: 1 },
      {
        question: "What does the speaker wear?",
        options: ["A coat", "A hat and short pants", "Boots"],
        correctIndex: 1,
      },
      {
        question: "What do the friends play?",
        options: ["Football", "Basketball", "Tennis"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "l1-grandmother",
    title: "My Grandmother",
    level: "Cấp 1 — Dễ nhất",
    passage:
      "My grandmother lives with us. She is very kind. Every morning, she makes breakfast for the family. She likes to tell me old stories. I love my grandmother very much.",
    questions: [
      {
        question: "Who lives with the speaker?",
        options: ["Grandmother", "Aunt", "Cousin"],
        correctIndex: 0,
      },
      {
        question: "What does grandmother do every morning?",
        options: ["Cleans the house", "Makes breakfast", "Goes to work"],
        correctIndex: 1,
      },
      {
        question: "What does grandmother like to do?",
        options: ["Tell old stories", "Watch television", "Play games"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "l1-cup-of-milk",
    title: "A Cup of Milk",
    level: "Cấp 1 — Dễ nhất",
    passage:
      "Every night, I drink a cup of milk before bed. The milk is warm. My mother makes it for me. It helps me sleep well. I feel happy and full.",
    questions: [
      {
        question: "When does the speaker drink milk?",
        options: ["In the morning", "Before bed", "At lunch"],
        correctIndex: 1,
      },
      { question: "How is the milk?", options: ["Cold", "Warm", "Hot"], correctIndex: 1 },
      { question: "Who makes the milk?", options: ["Father", "Mother", "Brother"], correctIndex: 1 },
    ],
  },
  {
    id: "l1-toy-box",
    title: "My Toy Box",
    level: "Cấp 1 — Dễ nhất",
    passage:
      "I have a big toy box in my room. Inside, there are cars, blocks, and a teddy bear. My favorite toy is the teddy bear. Every night, I sleep with it.",
    questions: [
      {
        question: "Where is the toy box?",
        options: ["In the kitchen", "In my room", "In the garden"],
        correctIndex: 1,
      },
      {
        question: "What is inside the toy box?",
        options: ["Cars, blocks, and a teddy bear", "Books and pens", "Clothes and shoes"],
        correctIndex: 0,
      },
      {
        question: "What is the favorite toy?",
        options: ["A car", "A block", "A teddy bear"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "l1-big-tree",
    title: "The Big Tree",
    level: "Cấp 1 — Dễ nhất",
    passage:
      "There is a big tree near my house. It is very tall and old. Birds live in the tree. In summer, I like to sit under the tree and read books.",
    questions: [
      {
        question: "Where is the big tree?",
        options: ["Near my house", "Near the school", "Near the river"],
        correctIndex: 0,
      },
      { question: "Who lives in the tree?", options: ["Cats", "Birds", "Rabbits"], correctIndex: 1 },
      {
        question: "What does the speaker do under the tree?",
        options: ["Sleeps", "Reads books", "Sings songs"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l1-red-ball",
    title: "My Red Ball",
    level: "Cấp 1 — Dễ nhất",
    passage:
      "I have a red ball. I play with it every afternoon. Sometimes I play with my brother in the yard. One day, the ball rolled into the street. My father helped me get it back.",
    questions: [
      { question: "What color is the ball?", options: ["Red", "Blue", "Yellow"], correctIndex: 0 },
      {
        question: "Who does the speaker play with?",
        options: ["Sister", "Brother", "Friend"],
        correctIndex: 1,
      },
      {
        question: "Who helped get the ball back?",
        options: ["Mother", "Father", "Teacher"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l1-small-bird",
    title: "A Small Bird",
    level: "Cấp 1 — Dễ nhất",
    passage:
      "This morning, I saw a small bird outside my window. It was yellow with a short tail. It was singing a happy song. I watched it for a long time before it flew away.",
    questions: [
      {
        question: "When did the speaker see the bird?",
        options: ["This morning", "Last night", "Yesterday afternoon"],
        correctIndex: 0,
      },
      { question: "What color was the bird?", options: ["Blue", "Yellow", "Brown"], correctIndex: 1 },
      {
        question: "What was the bird doing?",
        options: ["Sleeping", "Singing", "Eating"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l1-water-bottle",
    title: "My Water Bottle",
    level: "Cấp 1 — Dễ nhất",
    passage:
      "I bring a water bottle to school every day. It is pink with white stars. I drink water during breaks. My teacher says drinking water is very good for our health.",
    questions: [
      {
        question: "What color is the water bottle?",
        options: ["Pink with white stars", "Blue with dots", "Green and yellow"],
        correctIndex: 0,
      },
      {
        question: "When does the speaker drink water?",
        options: ["During breaks", "After school", "Before school"],
        correctIndex: 0,
      },
      {
        question: "What does the teacher say?",
        options: ["Water is good for health", "Water is heavy", "Water is expensive"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "l2-going-to-market",
    title: "Going to the Market",
    level: "Cấp 2 — Dễ",
    passage:
      "On Saturday morning, I go to the market with my mother. We buy fruits, vegetables, and fish. The market is noisy and full of people. I like to look at the colorful fruits.",
    questions: [
      {
        question: "When do they go to the market?",
        options: ["Saturday morning", "Sunday evening", "Monday afternoon"],
        correctIndex: 0,
      },
      {
        question: "What do they buy?",
        options: ["Fruits, vegetables, and fish", "Clothes and shoes", "Toys and books"],
        correctIndex: 0,
      },
      {
        question: "What does the speaker like?",
        options: ["The noisy people", "The colorful fruits", "The long lines"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l2-favorite-toy",
    title: "My Favorite Toy",
    level: "Cấp 2 — Dễ",
    passage:
      "My favorite toy is a robot. It can walk and make sounds. My father gave it to me on my birthday. I play with it every day after my homework. My little brother likes it too.",
    questions: [
      { question: "What is the favorite toy?", options: ["A robot", "A car", "A doll"], correctIndex: 0 },
      { question: "Who gave the toy?", options: ["Mother", "Father", "Grandfather"], correctIndex: 1 },
      {
        question: "When does the speaker play with it?",
        options: ["Before school", "After homework", "During lunch"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l2-ice-cream-truck",
    title: "The Ice Cream Truck",
    level: "Cấp 2 — Dễ",
    passage:
      "Every afternoon, an ice cream truck comes to our street. It plays a happy song. All the children run outside to buy ice cream. My favorite flavor is chocolate. I always ask my mother for money.",
    questions: [
      {
        question: "What comes every afternoon?",
        options: ["A bus", "An ice cream truck", "A bicycle"],
        correctIndex: 1,
      },
      {
        question: "What is the favorite flavor?",
        options: ["Vanilla", "Strawberry", "Chocolate"],
        correctIndex: 2,
      },
      {
        question: "What does the speaker ask mother for?",
        options: ["Toys", "Money", "Books"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l2-walk-in-rain",
    title: "A Walk in the Rain",
    level: "Cấp 2 — Dễ",
    passage:
      "Yesterday, it started to rain while I was walking home. I did not have an umbrella. My clothes got wet, but I did not mind. I jumped in the puddles and laughed. It was a fun surprise.",
    questions: [
      {
        question: "What happened while walking home?",
        options: ["It started to rain", "It got very hot", "A dog followed me"],
        correctIndex: 0,
      },
      {
        question: "Did the speaker have an umbrella?",
        options: ["Yes", "No", "Not mentioned"],
        correctIndex: 1,
      },
      {
        question: "What did the speaker do?",
        options: ["Cried", "Jumped in puddles", "Ran home fast"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l2-new-backpack",
    title: "My New Backpack",
    level: "Cấp 2 — Dễ",
    passage:
      "My mother bought me a new backpack for school. It is green with a picture of a dinosaur. It has many pockets for my books and pencils. I am very proud of my new backpack.",
    questions: [
      { question: "What color is the backpack?", options: ["Green", "Purple", "Orange"], correctIndex: 0 },
      { question: "What picture is on it?", options: ["A dinosaur", "A car", "A flower"], correctIndex: 0 },
      {
        question: "What makes the backpack useful?",
        options: ["It is heavy", "It has many pockets", "It is expensive"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l2-little-duck",
    title: "The Little Duck",
    level: "Cấp 2 — Dễ",
    passage:
      "Near my house, there is a small pond. A mother duck and her babies swim there every day. The baby ducks are yellow and fluffy. I like to watch them swim in a line behind their mother.",
    questions: [
      {
        question: "Where do the ducks swim?",
        options: ["In a small pond", "In the sea", "In a swimming pool"],
        correctIndex: 0,
      },
      {
        question: "What color are the baby ducks?",
        options: ["White", "Yellow", "Grey"],
        correctIndex: 1,
      },
      {
        question: "How do the baby ducks swim?",
        options: ["In a circle", "In a line behind their mother", "All alone"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l2-grandfathers-garden",
    title: "My Grandfather's Garden",
    level: "Cấp 2 — Dễ",
    passage:
      "My grandfather has a big garden behind his house. He grows tomatoes, carrots, and flowers. Every weekend, I help him water the plants. He teaches me the names of different vegetables.",
    questions: [
      {
        question: "What does the grandfather grow?",
        options: ["Tomatoes, carrots, and flowers", "Rice and corn", "Apples and bananas"],
        correctIndex: 0,
      },
      {
        question: "When does the speaker help?",
        options: ["Every weekend", "Every morning", "Every evening"],
        correctIndex: 0,
      },
      {
        question: "What does the grandfather teach?",
        options: ["How to cook", "The names of vegetables", "How to swim"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l2-picnic-in-park",
    title: "A Picnic in the Park",
    level: "Cấp 2 — Dễ",
    passage:
      "Last Sunday, my family had a picnic in the park. We brought sandwiches, juice, and fruit. We sat on a blanket under a big tree. After lunch, we played badminton together. It was a relaxing day.",
    questions: [
      {
        question: "Where did they have the picnic?",
        options: ["At home", "In the park", "At the beach"],
        correctIndex: 1,
      },
      {
        question: "What did they bring?",
        options: ["Sandwiches, juice, and fruit", "Rice and soup", "Pizza and cake"],
        correctIndex: 0,
      },
      {
        question: "What did they play after lunch?",
        options: ["Football", "Badminton", "Chess"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l2-sisters-doll",
    title: "My Sister's Doll",
    level: "Cấp 2 — Dễ",
    passage:
      "My little sister has a favorite doll named Lily. Lily has long yellow hair and a pink dress. My sister takes Lily everywhere, even to bed. One day, Lily was lost, and my sister cried a lot.",
    questions: [
      { question: "What is the doll's name?", options: ["Lily", "Rosy", "Amy"], correctIndex: 0 },
      {
        question: "What color is the doll's dress?",
        options: ["Blue", "Pink", "White"],
        correctIndex: 1,
      },
      {
        question: "What happened one day?",
        options: ["The doll broke", "The doll was lost", "The doll got dirty"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l2-noisy-classroom",
    title: "The Noisy Classroom",
    level: "Cấp 2 — Dễ",
    passage:
      "This morning, our classroom was very noisy. Everyone was talking and laughing before the teacher arrived. When the teacher came in, everyone became quiet. Then our lesson started as usual.",
    questions: [
      {
        question: "What was the classroom like this morning?",
        options: ["Quiet", "Noisy", "Empty"],
        correctIndex: 1,
      },
      {
        question: "What happened when the teacher arrived?",
        options: ["Everyone left", "Everyone became quiet", "Everyone kept talking"],
        correctIndex: 1,
      },
      {
        question: "What happened after that?",
        options: ["The lesson started", "The class ended", "They went outside"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "l3-school-library",
    title: "The School Library",
    level: "Cấp 3 — Trung bình",
    passage:
      "Our school has a big library. It has thousands of books about animals, science, and stories. Every Wednesday, my class visits the library. I always borrow two books to read at home. Reading makes me happy.",
    questions: [
      {
        question: "How often does the class visit the library?",
        options: ["Every Monday", "Every Wednesday", "Every Friday"],
        correctIndex: 1,
      },
      {
        question: "How many books does the speaker borrow?",
        options: ["One", "Two", "Three"],
        correctIndex: 1,
      },
      {
        question: "What does reading make the speaker feel?",
        options: ["Happy", "Tired", "Bored"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "l3-favorite-cartoon",
    title: "My Favorite Cartoon",
    level: "Cấp 3 — Trung bình",
    passage:
      "Every Saturday morning, I watch my favorite cartoon on television. It is about a brave girl and her magic dog. They travel to different places and help people. I always learn something new from the show.",
    questions: [
      {
        question: "When does the speaker watch the cartoon?",
        options: ["Every Saturday morning", "Every Friday night", "Every day"],
        correctIndex: 0,
      },
      {
        question: "Who are the main characters?",
        options: ["A brave girl and her magic dog", "Two robots", "A family of bears"],
        correctIndex: 0,
      },
      {
        question: "What does the speaker learn?",
        options: ["Something new", "Nothing", "Old lessons"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "l3-visit-doctor",
    title: "A Visit to the Doctor",
    level: "Cấp 3 — Trung bình",
    passage:
      "Last week, I felt sick, so my mother took me to see the doctor. The doctor checked my temperature and looked at my throat. She said I needed more rest and water. After a few days, I felt much better.",
    questions: [
      {
        question: "Why did the speaker see the doctor?",
        options: ["For a check-up", "Because of feeling sick", "For an injury"],
        correctIndex: 1,
      },
      {
        question: "What did the doctor check?",
        options: ["Temperature and throat", "Eyes and ears", "Teeth"],
        correctIndex: 0,
      },
      {
        question: "What did the doctor say to do?",
        options: ["Take medicine only", "Rest and drink water", "Stay in bed for a month"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l3-music-class",
    title: "The Music Class",
    level: "Cấp 3 — Trung bình",
    passage:
      "I have music class every Tuesday. Our teacher plays the piano, and we sing songs together. Last week, we learned a new song about friendship. I really enjoy singing with my classmates.",
    questions: [
      { question: "When is the music class?", options: ["Monday", "Tuesday", "Wednesday"], correctIndex: 1 },
      { question: "What does the teacher play?", options: ["The guitar", "The piano", "The drum"], correctIndex: 1 },
      {
        question: "What was the new song about?",
        options: ["Animals", "Friendship", "The weather"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l3-neighbors-garden",
    title: "My Neighbor's Garden",
    level: "Cấp 3 — Trung bình",
    passage:
      "My neighbor has a beautiful garden full of roses. Every spring, the roses bloom in many colors: red, pink, and white. She lets me pick a flower sometimes. I always say thank you to her.",
    questions: [
      {
        question: "What is in the neighbor's garden?",
        options: ["Roses", "Vegetables", "Trees only"],
        correctIndex: 0,
      },
      { question: "When do the roses bloom?", options: ["Winter", "Spring", "Autumn"], correctIndex: 1 },
      {
        question: "What does the neighbor let the speaker do?",
        options: ["Water the garden", "Pick a flower sometimes", "Cut the grass"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l3-lost-key",
    title: "The Lost Key",
    level: "Cấp 3 — Trung bình",
    passage:
      "Yesterday, my father lost his house key. We looked everywhere in the house but could not find it. Finally, my little sister found it under the sofa. My father was very relieved and thanked her.",
    questions: [
      { question: "What did the father lose?", options: ["His wallet", "His house key", "His phone"], correctIndex: 1 },
      {
        question: "Who found the key?",
        options: ["Mother", "Little sister", "The neighbor"],
        correctIndex: 1,
      },
      {
        question: "Where was the key found?",
        options: ["Under the sofa", "In the kitchen", "In the car"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "l3-trip-to-market",
    title: "A Trip to the Market",
    level: "Cấp 3 — Trung bình",
    passage:
      "On the weekend, my father and I went to the market to buy fresh vegetables. The market was crowded with sellers and buyers. We bought tomatoes, onions, and green beans. My father taught me how to choose fresh vegetables.",
    questions: [
      {
        question: "Who went to the market?",
        options: ["Father and the speaker", "Mother and sister", "The whole family"],
        correctIndex: 0,
      },
      {
        question: "What did they buy?",
        options: ["Tomatoes, onions, and green beans", "Fruit and fish", "Rice and meat"],
        correctIndex: 0,
      },
      {
        question: "What did the father teach?",
        options: ["How to cook", "How to choose fresh vegetables", "How to bargain"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l3-uncles-farm",
    title: "My Uncle's Farm",
    level: "Cấp 3 — Trung bình",
    passage:
      "During summer vacation, I visited my uncle's farm in the countryside. The farm had cows, chickens, and a big rice field. I helped feed the chickens every morning. I really enjoyed my time there.",
    questions: [
      {
        question: "When did the speaker visit the farm?",
        options: ["Winter vacation", "Summer vacation", "Spring holiday"],
        correctIndex: 1,
      },
      {
        question: "What did the farm have?",
        options: ["Cows, chickens, and a rice field", "Only chickens", "A swimming pool"],
        correctIndex: 0,
      },
      {
        question: "What did the speaker do every morning?",
        options: ["Milk the cows", "Feed the chickens", "Plant rice"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l3-broken-toy",
    title: "The Broken Toy",
    level: "Cấp 3 — Trung bình",
    passage:
      "Last week, my toy car broke while I was playing. I felt very sad because it was my favorite toy. My father looked at it and fixed it with some glue. Now the car works again, and I am very happy.",
    questions: [
      { question: "What broke?", options: ["A toy car", "A toy robot", "A bicycle"], correctIndex: 0 },
      { question: "How did the speaker feel?", options: ["Angry", "Sad", "Bored"], correctIndex: 1 },
      { question: "Who fixed the toy?", options: ["Mother", "Father", "A friend"], correctIndex: 1 },
    ],
  },
  {
    id: "l3-snowy-morning",
    title: "A Snowy Morning",
    level: "Cấp 3 — Trung bình",
    passage:
      "One winter morning, I woke up and saw snow everywhere. The trees and roofs were covered in white. My brother and I went outside to make a snowman. We used a carrot for its nose. It was a magical day.",
    questions: [
      { question: "What did the speaker see in the morning?", options: ["Rain", "Snow", "Fog"], correctIndex: 1 },
      {
        question: "What did the brothers make?",
        options: ["A snowman", "A sandcastle", "A kite"],
        correctIndex: 0,
      },
      { question: "What did they use for the nose?", options: ["A stone", "A carrot", "A button"], correctIndex: 1 },
    ],
  },
  {
    id: "l4-school-play",
    title: "The School Play",
    level: "Cấp 4 — Khó",
    passage:
      "Our school had a play last month. I played the role of a kind farmer. I practiced my lines every night for two weeks. On the day of the play, I felt nervous, but everything went well. My parents were very proud of me.",
    questions: [
      { question: "What role did the speaker play?", options: ["A king", "A kind farmer", "A doctor"], correctIndex: 1 },
      {
        question: "How long did the speaker practice?",
        options: ["One week", "Two weeks", "One month"],
        correctIndex: 1,
      },
      {
        question: "How did the speaker feel on the day?",
        options: ["Nervous", "Angry", "Bored"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "l4-cousins-visit",
    title: "My Cousin's Visit",
    level: "Cấp 4 — Khó",
    passage:
      "Last weekend, my cousin came to visit us from another city. We had not seen each other for a year. We played games, watched movies, and told each other stories. I was sad when she had to leave on Sunday evening.",
    questions: [
      {
        question: "Where did the cousin come from?",
        options: ["Another city", "Another country", "The next street"],
        correctIndex: 0,
      },
      {
        question: "How long had they not seen each other?",
        options: ["A month", "A year", "A week"],
        correctIndex: 1,
      },
      {
        question: "When did the cousin leave?",
        options: ["Saturday morning", "Sunday evening", "Monday afternoon"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l4-day-at-lake",
    title: "A Day at the Lake",
    level: "Cấp 4 — Khó",
    passage:
      "Last summer, we spent a day at the lake near our town. We rented a small boat and rowed around the lake. My father caught two fish. In the evening, we cooked the fish and had a delicious dinner by the water.",
    questions: [
      { question: "Where did they spend the day?", options: ["At the lake", "At the beach", "At the river"], correctIndex: 0 },
      { question: "What did they rent?", options: ["A bicycle", "A small boat", "A car"], correctIndex: 1 },
      { question: "What did the father catch?", options: ["Two fish", "A crab", "Nothing"], correctIndex: 0 },
    ],
  },
  {
    id: "l4-class-trip",
    title: "The Class Trip",
    level: "Cấp 4 — Khó",
    passage:
      "Our class went on a trip to a science museum last Friday. We saw many interesting machines and models of the solar system. The guide explained how airplanes fly. I took many photos to show my parents.",
    questions: [
      { question: "Where did the class go?", options: ["A zoo", "A science museum", "An art gallery"], correctIndex: 1 },
      {
        question: "What did the guide explain?",
        options: ["How airplanes fly", "How trains work", "How computers work"],
        correctIndex: 0,
      },
      { question: "What did the speaker do?", options: ["Bought souvenirs", "Took many photos", "Wrote a report"], correctIndex: 1 },
    ],
  },
  {
    id: "l4-grandmothers-cooking",
    title: "My Grandmother's Cooking",
    level: "Cấp 4 — Khó",
    passage:
      "My grandmother is an excellent cook. Every Sunday, she makes a special soup for the whole family. She uses fresh vegetables and herbs from her garden. Everyone always asks for a second bowl of her soup.",
    questions: [
      {
        question: "What does grandmother make every Sunday?",
        options: ["A special soup", "A cake", "Fried rice"],
        correctIndex: 0,
      },
      { question: "Where do the vegetables come from?", options: ["The market", "Her garden", "A neighbor"], correctIndex: 1 },
      { question: "What do people ask for?", options: ["A second bowl", "A recipe", "A photo"], correctIndex: 0 },
    ],
  },
  {
    id: "l4-new-student",
    title: "The New Student",
    level: "Cấp 4 — Khó",
    passage:
      "A new student joined our class this week. His name is Nam, and he moved from a different town. At first, he was quiet and shy. After a few days, he made new friends and started to smile more often.",
    questions: [
      { question: "What is the new student's name?", options: ["Nam", "Long", "Hoang"], correctIndex: 0 },
      { question: "How did he feel at first?", options: ["Excited", "Quiet and shy", "Angry"], correctIndex: 1 },
      {
        question: "What happened after a few days?",
        options: ["He left the school", "He made new friends", "He stayed alone"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l4-windy-afternoon",
    title: "A Windy Afternoon",
    level: "Cấp 4 — Khó",
    passage:
      "One afternoon, a strong wind blew through our neighborhood. Leaves and papers flew everywhere. My kite flew so high that I almost lost sight of it. I held the string tightly and laughed with excitement.",
    questions: [
      { question: "What blew through the neighborhood?", options: ["Rain", "A strong wind", "Snow"], correctIndex: 1 },
      { question: "What flew very high?", options: ["A bird", "A kite", "A balloon"], correctIndex: 1 },
      { question: "How did the speaker feel?", options: ["Scared", "Excited", "Bored"], correctIndex: 1 },
    ],
  },
  {
    id: "l4-missing-homework",
    title: "The Missing Homework",
    level: "Cấp 4 — Khó",
    passage:
      "This morning, I could not find my math homework. I looked in my bag, on my desk, and under my bed. Finally, I found it inside my storybook. I was relieved because I did not want to be late.",
    questions: [
      { question: "What was missing?", options: ["A pencil case", "Math homework", "A textbook"], correctIndex: 1 },
      {
        question: "Where did the speaker find it?",
        options: ["Inside a storybook", "In the kitchen", "At school"],
        correctIndex: 0,
      },
      { question: "How did the speaker feel?", options: ["Relieved", "Angry", "Confused"], correctIndex: 0 },
    ],
  },
  {
    id: "l4-uncle-firefighter",
    title: "My Uncle the Firefighter",
    level: "Cấp 4 — Khó",
    passage:
      "My uncle works as a firefighter in the city. He helps put out fires and saves people in danger. Sometimes he tells me exciting stories about his job. I think he is very brave, and I want to be like him someday.",
    questions: [
      { question: "What is the uncle's job?", options: ["Police officer", "Firefighter", "Doctor"], correctIndex: 1 },
      {
        question: "What does he do?",
        options: ["Puts out fires and saves people", "Builds houses", "Drives buses"],
        correctIndex: 0,
      },
      {
        question: "What does the speaker want?",
        options: ["To travel with him", "To be like him someday", "To visit his station"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l4-butterfly-garden",
    title: "The Butterfly Garden",
    level: "Cấp 4 — Khó",
    passage:
      "Near our school, there is a small butterfly garden. It has many colorful flowers that attract butterflies. Last week, our class visited the garden and watched the butterflies fly from flower to flower. It was a beautiful sight.",
    questions: [
      { question: "What is near the school?", options: ["A butterfly garden", "A zoo", "A lake"], correctIndex: 0 },
      {
        question: "What attracts the butterflies?",
        options: ["Colorful flowers", "Sweet fruit", "Bright lights"],
        correctIndex: 0,
      },
      { question: "What did the class do?", options: ["Caught butterflies", "Watched the butterflies", "Painted pictures"], correctIndex: 1 },
    ],
  },
  {
    id: "l5-science-fair",
    title: "The Science Fair",
    level: "Cấp 5 — Khó nhất",
    passage:
      "Last month, I took part in my school's science fair. I built a small model to show how volcanoes erupt. Many students and parents came to see the projects. My teacher said my model was very creative, and I felt proud.",
    questions: [
      { question: "What event did the speaker take part in?", options: ["A sports day", "A science fair", "An art contest"], correctIndex: 1 },
      {
        question: "What did the model show?",
        options: ["How volcanoes erupt", "How plants grow", "How rockets fly"],
        correctIndex: 0,
      },
      {
        question: "What did the teacher say?",
        options: ["It was very creative", "It was too simple", "It was incorrect"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "l5-camping-trip",
    title: "A Camping Trip",
    level: "Cấp 5 — Khó nhất",
    passage:
      "Last weekend, my family went camping in the forest. We set up a tent near a river and cooked dinner over a campfire. At night, we looked at the stars and told funny stories. I loved sleeping outside under the sky.",
    questions: [
      { question: "Where did they go camping?", options: ["In the forest", "At the beach", "In the city"], correctIndex: 0 },
      { question: "What did they cook over?", options: ["A stove", "A campfire", "A microwave"], correctIndex: 1 },
      { question: "What did they do at night?", options: ["Watched television", "Looked at the stars", "Went shopping"], correctIndex: 1 },
    ],
  },
  {
    id: "l5-first-bicycle-ride",
    title: "My First Bicycle Ride",
    level: "Cấp 5 — Khó nhất",
    passage:
      "Last year, my father taught me how to ride a bicycle. At first, I fell down many times, but I did not give up. After a few weeks of practice, I could ride without help. Now, I ride my bicycle to school every day.",
    questions: [
      { question: "Who taught the speaker to ride?", options: ["Mother", "Father", "Brother"], correctIndex: 1 },
      {
        question: "What happened at first?",
        options: ["The speaker rode perfectly", "The speaker fell down many times", "The speaker refused to try"],
        correctIndex: 1,
      },
      {
        question: "What does the speaker do now?",
        options: ["Rides to school every day", "Never rides anymore", "Only rides on weekends"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "l5-talent-show",
    title: "The Talent Show",
    level: "Cấp 5 — Khó nhất",
    passage:
      "Our school held a talent show last Friday. Students sang songs, danced, and played instruments. My friend played the violin beautifully, and everyone clapped loudly. I wish I could join next year with a magic trick.",
    questions: [
      { question: "What event was held?", options: ["A talent show", "A sports competition", "A book fair"], correctIndex: 0 },
      { question: "What did the friend do?", options: ["Sang a song", "Played the violin", "Told a joke"], correctIndex: 1 },
      {
        question: "What does the speaker wish?",
        options: ["To sing next year", "To join with a magic trick", "To watch again"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l5-trip-to-mountains",
    title: "A Trip to the Mountains",
    level: "Cấp 5 — Khó nhất",
    passage:
      "During the holiday, my family traveled to the mountains. The air was cool and fresh. We walked along a trail and saw many kinds of trees and flowers. At the top, the view of the valley was amazing.",
    questions: [
      { question: "Where did the family travel?", options: ["To the mountains", "To the beach", "To the desert"], correctIndex: 0 },
      { question: "How was the air?", options: ["Hot and dry", "Cool and fresh", "Cold and windy"], correctIndex: 1 },
      { question: "What was amazing at the top?", options: ["The view of the valley", "The food", "The weather"], correctIndex: 0 },
    ],
  },
  {
    id: "l5-rainy-weekend",
    title: "The Rainy Weekend",
    level: "Cấp 5 — Khó nhất",
    passage:
      "It rained the whole weekend, so we could not go outside. Instead, my family played board games and baked cookies together. Even though we stayed inside, it was one of the happiest weekends I remember.",
    questions: [
      { question: "What was the weather like?", options: ["Sunny", "Rainy", "Windy"], correctIndex: 1 },
      {
        question: "What did the family do instead?",
        options: ["Watched movies all day", "Played board games and baked cookies", "Slept all day"],
        correctIndex: 1,
      },
      {
        question: "How did the speaker feel about the weekend?",
        options: ["Bored", "Happy", "Sad"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l5-grandparents-house",
    title: "My Grandparents' House",
    level: "Cấp 5 — Khó nhất",
    passage:
      "Every summer, I stay at my grandparents' house in the countryside. Their house is small but very comfortable. I help my grandfather feed the chickens and help my grandmother pick vegetables. I always look forward to these summer visits.",
    questions: [
      { question: "Where is the grandparents' house?", options: ["In the city", "In the countryside", "By the sea"], correctIndex: 1 },
      {
        question: "What does the speaker help grandfather with?",
        options: ["Feeding the chickens", "Fixing the roof", "Driving the car"],
        correctIndex: 0,
      },
      {
        question: "What does the speaker help grandmother with?",
        options: ["Cooking dinner", "Picking vegetables", "Washing clothes"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l5-sports-day",
    title: "The School Sports Day",
    level: "Cấp 5 — Khó nhất",
    passage:
      "Our school holds a sports day every October. Students compete in running, jumping, and swimming events. Last year, I won second place in the running race. This year, I am practicing harder to win first place.",
    questions: [
      { question: "When is the sports day?", options: ["Every October", "Every December", "Every March"], correctIndex: 0 },
      { question: "What did the speaker win last year?", options: ["First place", "Second place", "Third place"], correctIndex: 1 },
      { question: "What is the speaker doing this year?", options: ["Practicing harder", "Not joining", "Watching only"], correctIndex: 0 },
    ],
  },
  {
    id: "l5-visit-museum",
    title: "A Visit to the Museum",
    level: "Cấp 5 — Khó nhất",
    passage:
      "Last Sunday, my family visited a history museum in the city. We saw old tools, ancient clothes, and paintings from long ago. The guide told us interesting stories about our country's history. I learned a lot that day.",
    questions: [
      { question: "What kind of museum did they visit?", options: ["A history museum", "An art museum", "A science museum"], correctIndex: 0 },
      {
        question: "What did they see?",
        options: ["Old tools, ancient clothes, and paintings", "Modern robots", "Animals"],
        correctIndex: 0,
      },
      {
        question: "What did the guide tell them?",
        options: ["Stories about the country's history", "Jokes", "Songs"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "l5-kind-stranger",
    title: "The Kind Stranger",
    level: "Cấp 5 — Khó nhất",
    passage:
      "One day, I dropped my books on the street, and everything fell everywhere. A kind stranger stopped and helped me pick everything up. He smiled and told me to be careful next time. I thanked him and felt grateful for his help.",
    questions: [
      {
        question: "What happened to the speaker?",
        options: ["Dropped books on the street", "Lost some money", "Fell off a bicycle"],
        correctIndex: 0,
      },
      { question: "Who helped the speaker?", options: ["A teacher", "A kind stranger", "A classmate"], correctIndex: 1 },
      { question: "How did the speaker feel?", options: ["Angry", "Grateful", "Embarrassed"], correctIndex: 1 },
    ],
  },
];

export function findListeningLesson(id: string): ListeningLesson | undefined {
  return listeningLessons.find((l) => l.id === id);
}

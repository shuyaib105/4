export const courseTabsData = [
  {
    "name": "HSC 26",
    "id": "hsc-26",
    "courses": [
      {
        "id": "physics-second-part",
        "title": "Physics Second Part",
        "price": "FREE",
        "description": "A comprehensive course covering the second part of HSC Physics, designed to build a strong foundation and problem-solving skills.",
        "startDate": "কোর্স শুরু: February 1st",
        "features": [
          "১০ টি অধ্যায় ভিত্তিক MCQ Exam",
          "১টি সাবজেক্ট ফাইনাল এক্সাম",
          "কোর্স শেষে CQ সাজেশন পিডিএফ ফাইল প্রদান"
        ],
        "image": "https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/phy2f.webp",
        "imageHint": "physics textbook",
        "disabled": false
      }
    ]
  },
  {
    "name": "QB course",
    "id": "qb-course",
    "courses": [
      {
        "id": "hsc-question-bank-solve",
        "title": "HSC প্রশ্নব্যাংক সলভ",
        "price": "৳700",
        "description": "এইচএসসি পরীক্ষার জন্য বিগত বছরের প্রশ্নব্যাংক সলভ ও বিশ্লেষণ।",
        "startDate": undefined,
        "features": ["বিগত বছরের প্রশ্ন সমাধান", "অধ্যায়ভিত্তিক আলোচনা", "বিশেষ মডেল টেস্ট"],
        "image": "https://images.unsplash.com/photo-1592698765727-387c9464cd7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxxdWVzdGlvbiUyMGJhbmt8ZW58MHx8fHwxNzY4NTg5NzkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "imageHint": "question bank",
        "disabled": false
      }
    ]
  }
];


export const allCourses = courseTabsData.flatMap(tab => tab.courses);

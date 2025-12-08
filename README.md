# 🎨✨ DoodleQuest  
**Play. Doodle. Grow!**

DoodleQuest is an AI-powered play and learn platform developed by team **Mind Canvas** for the **Smart India Hackathon 2025**.  
This project addresses the problem statement **"Self Learning Revolution: Smart play & Less Screen"** under the *Toys and Games* theme.

---

## 🎯 Our Vision

**Aim:** To build a platform where children can play and learn effectively through Doodling, by limiting Screen Time.  

**Vision:** Our mission is to design an engaging playful learning platform that integrates doodling into education, encourages creativity, reduces screen time to develop knowledge, imagination, and healthy study habits.

---

## 🚨 The Problem
- Children quickly get bored of the many toys they buy and demand more from their parents.  
- When a child doodles without guidance, they might learn concepts incorrectly (e.g., drawing a moon instead of a sun).  
- Screen time addiction is a growing concern. Studies show **17.5% of students fall into an addiction category**, and **19% spend over 3 hours a day on video games**.

---

## 💡 Our Solution
**DoodleQuest** is an AI-powered play and learn platform that offers a sustainable and engaging alternative.

- **Dual Mode Drawing:** The platform supports both screen and paper drawings through camera and screen detection.  
- **AI Doodle Recognition:** It recognizes doodles drawn by the child using Machine Learning.  
- **Interactive Content:** Based on the recognized doodle, it creates doodle-specific games, customized puzzles, and generates personalized stories to make learning fun, interactive, and creative.  
- **Reduces Screen Time:** It provides a single platform with multiple games, promoting healthy habits by reducing overall screen time.
- **Dual Mode:** The system is designed to function in a "Dual Mode," which supports both on-screen drawing and, crucially, paper drawings captured via a camera. This dual functionality is central to reducing direct interaction with a screen.

---
### The hardware components that enable this low-screen time interaction are:

- A Raspberry Pi 
- A Camera Sensor 
- GPIO buttons 
- A simple speaker 

This hardware setup allows a child to draw on physical paper. The camera sensor captures the doodle, which is then processed by the system, thus providing an interactive learning experience without requiring the child to be constantly focused on a digital screen.  

---

## ✨ Features
- **Dual Dashboards:** Separate, insightful dashboards for both parents and children.
  
  <div align="center">
  <table>
    <tr>
      <td align="center"><b>Parent Dashboard</b></td>
      <td align="center"><b>Child Dashboard</b></td>
    </tr>
    <tr>
      <td><img width="500" height="600" alt="Parental Dashboard 1" src="https://github.com/user-attachments/assets/73326547-cb50-4a51-ac2d-c6db0518d122" /></td>
      <td><img width="494" height="600" alt="image" src="https://github.com/user-attachments/assets/aa3242e4-e4e6-4830-be5b-544969bc3268" /></td>
    </tr>
  </table>
</div>
 
- **Smart Doodle Analysis:**  
  - Safe/Unsafe Doodle Detection to ensure a safe creative environment.  
  - Smart Hints to provide guidance during the drawing process.  
- **Adaptive Difficulty:** The platform adjusts its difficulty based on the child's performance.  

**Accessibility:**  
- Multilingual Narration for a wider reach.  
- Inclusivity with features like dyslexia-friendly fonts.  

---

## ⚙️ Platform Process Flow
1. **Start:** The child opens the platform.  
2. **Doodle Creation:** The child draws on a tablet, phone, or whiteboard.
   
   <div align="center">
  <table>
    <tr>
      <td align="center"><b>Paper Mode</b></td>
      <td align="center"><b>Screen Mode</b></td>
    </tr>
    <tr>
      <td><img width="400" height="300" alt="Paper Drawing 1" src="https://github.com/user-attachments/assets/18d18bb0-2741-4b40-bc7b-202938303abc" /></td>
      <td><img width="400" height="300" alt="Screen Drawing 1" src="https://github.com/user-attachments/assets/6a883b00-1c6e-4ec7-8139-e0a95376ed66" /></td>
    </tr>
  </table>
</div>

3. **Doodle Recognition:** The AI model recognizes the doodle.  
4. **Story Personalization:** A personalized story is generated based on the drawing.
   
   <img width="400" height="300" alt="Story Time 1" src="https://github.com/user-attachments/assets/7ca20a3c-9257-4912-ad2b-326222b3d714" />

5. **STEM Challenges:** The child engages with educational challenges.  
6. **Play and Rewards:** The child earns rewards for completing tasks.  
7. **Dashboard Update:** The child's progress is updated on their dashboard.  
8. **Exit:** The child exits the platform.  

---





## 🛠️ Tech Stack

| Category   | Technology                                                                 |
|------------|-----------------------------------------------------------------------------|
| Frontend   | React.js, Tailwind CSS, JavaScript                                          |
| Backend    | Node.js, Python, JWT                                                        |
| AI & APIs  | TensorFlow Lite, OpenAI API, Google Cloud TTS, MediaPipe, OpenCV            |
| Hardware   | Smartphone/Laptop, Raspberry Pi, Camera Sensor, GPIO buttons, Speaker       |

---

## 📁 Project Structure
Here is the folder setup for the `src` directory, outlining the component-based architecture:

```
src/
├── assets/
├── components/
│ ├── dashboards/
│ │ ├── Child.jsx
│ │ └── Parent.jsx
│ ├── drawingPages/
│ │ ├── paperDrawing.jsx
│ │ └── screenDrawing.jsx
│ ├── my doodles/
│ │ ├── Doodledesk.jsx
│ │ └── index.css
│ ├── quiz/
│ │ ├── Quiz.jsx
│ │ ├── QuizFlash.jsx
│ │ └── QuizReward.jsx
│ ├── rewards/
│ │ └── Rewards.jsx
│ ├── story/
│ │ └── storytime.jsx
│ ├── Login.jsx
│ ├── Signup.jsx
│ ├── Welcome2.jsx
│ └── WelcomePage.jsx
├── App.jsx
├── index.css
└── main.jsx
```

---

## 🚀 Getting Started

### Prerequisites
You need to have **Node.js** and **npm** (or yarn) installed on your machine.

### Installation

Clone the repository:
```bash
git clone https://github.com/Vrinda2403/Doodle_Quest.git
```

Navigate to the project directory:
```bash 
cd Doodle_Quest
```

Install NPM packages:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

---
## 🧠 Challenges and Strategy

- **Challenge:** Recognition Accuracy with abstract child-like drawings.  
  **Strategy:** Use a confirmation and fallback system where the AI asks for confirmation or switches to a free-draw mode.  

- **Challenge:** Privacy concerns with sensitive features like facial expression analysis.  
  **Strategy:** All sensitive features are optional and require explicit user consent.  

- **Challenge:** API reliability and internet connectivity dependency.  
  **Strategy:** The app is designed with offline fallback modes for core features and graceful API error handling.  

---

## 🔗 Important Links
- [**GitHub Repository**](https://github.com/Vrinda2403/Doodle_Quest)  
- [**Demo Video**](https://youtu.be/LjF2fDIjEvI)  

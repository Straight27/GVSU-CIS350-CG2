# Overview 
The purpose of this is to formally document all requirements, expectations, and constraints for Study Sprite, and to serve as a blueprint and communication tool for our team. It will help us know what Study Sprite is supposed to do and how it should perform, which should help prevent misunderstanding and serve as a guide for the development lifecycle.
# Functional Requirements
1. Task and Assignment Management
    1. The system shall allow users to add assignments with a title, description, and due ate.
    2. The system shall allow users to mark assignments as complete.
    3. The system shall prevent users from unchecking an assignment once it is complete.
    4. The system shall visually differentiate between completed and incomplete assignments.
    5. The system shall persists assignment data locally using browser storage so that tasks remain after refresh.
2. Token and Reward System
    1. The system shall reward tokens when a user completes an assignment.
    2. The system shall display the user's total tokens in the UI.
    3. The system shall increase the token count in real time when assignments are completed.
    4. The system shall store token count in local storage to persist between sessions.
    5. The system shall feature a functional closet that allows the users to spend their tokens.
3. Interactive Study Sprite Behavior
    1. The system shall display a sprite on the main interface at all times.
    2. The system shall animate or change the sprite based on assingments being due.
    3. The system shall show idle animations when the user is not interacting.
    4. The system shall provide inspirational quotes.
    5. The system shall update sprite behavior without requiring user login or account creation.

# Non-Functional Requirements
1. Security and Data Integrity
    1. The system shall restrict data access to the local browser environment only.
    2. The system shall validate assignment inputs to prevent SQL injection.
    3. The system shall prevent not require internet access to function after initial load.
    4. The system shall maintain consistent data formats when storing updates to local storage.
    5. The system shall prevent external scripts from altering token or assignment storage.
2. Maintainability and Scalability
    1. The codebase shall follow modular design so new sprite behaviors or UI elements can be added without disruptions.
    2. All core functions shall be documented wtih comments for future developers.
    3. The system shall maintain separation between UI logic, storage logic, and sprite behavior logic.
    4. The architecture shall support adding future mini-games or challenges without needing to rewrite existing features.
    5. The system shall support switching storage mechanisms with minimal refactoring.
3. User Experience (UX) Quality
    1. Sprite animations feel natural and visually appealing, using smooth transitions.
    2. UI elements shall maintain consistent styling, spacing, and interaction patterns. 
    3. Notifications shall appear unobtrusively and fade automatically.
    4. The system shall provide feedback immediately after user actions.
    5. The layout shall adapt to small and large screens without visual distortion.

# Software Artifacts
The purpose of this section is to easily link to other important documents.
* [Gantt Chart](updated_gantt_chart_11-05-2025.png)
* [Use Case](use_case.pdf)
* [Communication Diagram](Com_diagram.pdf)
* [Class Diagram](/artifacts/Class_Obj.pdf)

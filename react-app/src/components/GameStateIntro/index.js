import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";

export default function GameStateIntro() {
  return (
    <div id="game-state-intro-container">
      <h4>Welcome to DevQuest!</h4>
      <p>
        DevQuest is capstone project submission for the App Academy bootcamp
        program.
      </p>
      <p>In DevQuest, you create a fledgeling software engineer character.</p>
      <p>
        Over the course of the game, you will fight turn-based battles against
        monsters (programming bugs),
      </p>
      <p>
        collect equipment (programming necessities like Coffee), and gain
        permanent bonuses to your character
      </p>
      <p>like stat boosts to you "Debugging" ability.</p>
      <p>
        Your goal is to survive all encounters, including the final "Capstone
        Project" monster
      </p>
      <p>In order to graduate and become a</p>
      <p>FULLSTACK ENGINEER</p>
      <OpenModalButton
        className="modal_button"
        buttonText="Create Account"
        modalComponent={<LoginFormModal />}
      />
    </div>
  );
}

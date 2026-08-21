import React from "react";
import { Button } from "../components/Button";

export function Consent({ next }) {
  return (
    <div className="mt-3 sm:mt-5 p-20">
      <noscript>
        <h1>Warning: Javascript is not working on your browser</h1>
        <p>The study will not work unless Javascript is enabled on your browser.</p>
        <p>Please enable Javascript then refresh this page.</p>
      </noscript>

      <h1>Consent to participate in research</h1>

      <blockquote>

        <p>TITLE OF RESEARCH: Computational Cognitive Science</p> <br></br>

        <p>PRINCIPAL INVESTIGATOR: Dr. Thomas Griffiths</p> <br></br>
        
        <p>PRINCIPAL INVESTIGATOR'S DEPARTMENT: Psychology</p> <br></br>

        <p>You are being invited to take part in a research study. Before you decide to participate in this study, it is 
          important that you understand why the research is being done and what it will involve. Please take the 
          time to read the following information carefully. Please ask the researcher if there is anything that is not 
          clear or if you need more information.
        </p> <br></br>

        <p><strong>Purpose of the research:</strong></p>
        <p>This project aims to collect data that can be used to evaluate formal accounts of causal learning, 
          categorization, and language learning and to track how knowledge about these areas is transformed when 
          passed from person to person.
        </p> <br></br>

        <p><strong>Study procedures:</strong></p>
        <p>You will be presented with some information (e.g., a written narrative, hypothetical scenarios, or 
          scientific data) and will then be asked to make one or more judgments about that information, or decisions
          based upon it. In some cases you will be asked to provide explanations or justifications for your 
          responses, typically in the form of a short paragraph. The task will not involve deception or emotionally 
          disturbing materials - just simple questions about categories, causal relationships, and languages. 
          The task you will perform will be one or more of the following: 1. Being shown a set of members of a 
          category, and then asked to indicate which other objects are likely to belong to the category. 2. Being 
          presented a sequence of pictures or sounds, and being asked to predict the next item in the sequence. 3. 
          Being told a set of words in a language, and then making judgments about whether other words belong to 
          the language. 4. Being shown statistical information about the interaction of causes and effects, and then 
          making judgments about the causal relationships involved. 5. Observing a set of events or reading a 
          description, and then evaluating the probability of other events or statements. 6. Being shown a list of 
          words, and then being asked to recall the words.
        </p> <br></br>

        <p>In some cases, you may be asked to provide audio through speaking. Your speech will be digitally 
          transcribed in realtime. The audio will not be saved and will never be heard by other humans. Only the 
          text which is transcribed may be passed on to future participants.
        </p> <br></br>

        <p>The answers you provide in the task may be used as stimuli for future participants. However, data that 
          would identify you will not be shared with other participants.
        </p> <br></br>

        <p>Your total expected time commitment for this study is: <u>12-15 minutes. You may wait for a team before beginning the study for up to 10 minutes</u>.</p> <br></br>
        
        <p><strong>Benefits and risks:</strong></p>
        <p>There are no direct benefits to you as a participant; however, by furthering our understanding of human 
          cognition, this research will benefit society by helping understand explore the evolutionary causes and 
          consequences of human behavior.
        </p> <br></br>
        
        <p>Risks associated with participation in this study are minimal. You may feel slight discomfort answering 
          some questions, but you may refrain from answering any questions that make you uncomfortable and may
          withdraw your participation at any time even after completing the experiment without penalty.
        </p> <br></br>

        <p><strong>Confidentiality:</strong></p>
        <p>
        We will not be asking for any personally identifying information, and we will handle responses as 
        confidentially as possible. Your name, or your Worker IDs will never be tied to your responses on this 
        survey. Data containing anything that might be personally identifiable (e.g. Worker IDs) will be encrypted
        on transfer and storage. We will be keeping data collected as part of this experiment indefinitely. This 
        anonymized data (containing neither Worker IDs nor IP addresses) may be shared with the scientific 
        community.
        </p> <br></br>

        <p>
          Complete confidentiality of responses cannot be guaranteed because officials of the U. S. Army Human 
          Research Protections Office are permitted by law to inspect the records obtained in this study to insure 
          compliance with laws and regulations covering experiments using human subjects. Your data will not be 
          associated with your name directly in any way. However, while the study is running it will be associated 
          with your Prolific ID which someone could potentially use to personally identify you. Once the study 
          is complete, we will replace your Prolific ID with a random string. These records may be shared with 
          other researchers, but will not contain your Prolific ID or any other personal information. Responses 
          you make within the study may be shown to other participants, but these responses will not be linked to 
          your personally identifiable information in any way.
        </p> <br></br>

        <p><strong>Compensation:</strong></p>
        <p>
          For your participation, you will receive $3.00 with a bonus of up to $1.50. If you have any questions about the study, feel free to contact Maureen Gill at mcg3@princeton.edu or the Principal Investigator, 
          Thomas Griffiths, at tomg@princeton.edu.
        </p> <br></br>

        <p><strong>Who to contact with questions:</strong></p> <br></br>
        <p>
          1. PRINCIPAL INVESTIGATOR: Thomas Griffiths, tomg@princeton.edu <br></br>
          2. If you have questions regarding your rights as a research subject, or if problems arise which you do 
            not feel you can discuss with the Investigator, please contact the Institutional Review Board at: <br /> 
            Assistant Director, Research Integrity and Assurance <br /> 
            Phone: (609) 258-8543 <br /> 
            Email: irb@princeton.edu 
        </p> <br></br>

        <p><strong>This study has been approved by the Institutional Review Board for Human Subjects</strong></p> <br></br>

        <p>I understand the information that was presented and that:</p>
        <p>A. My participation is voluntary, and I may withdraw my consent and discontinue 
          participation in the project at any time.  My refusal to participate will not result in any 
          penalty. <br /> 
          B. I do not waive any legal rights or release Princeton University, its agents, or you from 
          liability for negligence.
        </p> <br></br>

    </blockquote>

    <h4>I hereby give my consent to be the subject of your research.</h4> <br></br>

    <Button handleClick={next} autoFocus>
        <p>I agree</p>
    </Button>
    </div>
  );
}
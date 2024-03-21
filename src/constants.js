export const bucketHTML = `
<img src="assets/%choice%-bucket.svg", class="bucket">
`;

export const formatFeedback = (
  lastCorrectBucket,
  lastTrialCorrect,
  allBuckets,
) => {
  let message;
  if (lastTrialCorrect) {
    message = `<span class="green bold">Correct!</span> The coin was in the ${lastCorrectBucket} bucket.`;
  } else {
    message = `<span class="red bold">Incorrect.</span> The coin was actually in the ${lastCorrectBucket} bucket.`;
  }
  const bucketStimulus = allBuckets
    .map((bucket) => {
      const bucketImg = bucketHTML.replace("%choice%", bucket);
      return `<div class="bucketWrapper">${bucketImg}</div>`;
    })
    .join("");

  return `<div>
    <div class="feedback-message">
    ${message}
    </div>
    <div class = "coinRow" style="grid-template-columns:repeat(${
      allBuckets.length
    }, 1fr);width:calc(196 * ${allBuckets.length});">
    <img src="assets/coin.svg" class="coin" style="grid-column:${
      allBuckets.indexOf(lastCorrectBucket) + 1
    }">
    </div>
    <div class = "bucketRow">
    ${bucketStimulus}
    </div>
    </div>
    `;
};

export const nTrialsByCondition = {
  0: 20,
  1: 20,
  2: 20,
  3: 20,
};

export const messageConditionTimes = {
  0: 5,
  1: 20,
  2: 60,
};

export const bucketsByCondition = {
  0: {
    buckets: ["red", "blue"],
    probs: [0.8, 0.2],
  },
  1: {
    buckets: ["red", "blue"],
    probs: [0.2, 0.8],
  },
  2: {
    buckets: ["red", "blue", "green"],
    probs: [0.1, 0.7, 0.2],
  },
  3: {
    buckets: ["red", "blue", "green"],
    probs: [0.2, 0.1, 0.7],
  },
};

const timeEstimate = 5;
const basePayment = 1;
const maxBonus = 1;
export const consentText = `<p class="consent-text" style="text-align: center"><strong>CONSENT</strong></p>

<p class="consent-text"><strong>DESCRIPTION:</strong> You are invited to participate in a research study on human reasoning. We will ask you to answer a series of questions in order to learn how people reason. You will be asked to think about problems and answer by pressing buttons or writing text, and possibly explaining your reasoning into a microphone. Participation in this research is voluntary, and you are free to withdraw your consent at any time.</p>

<p class="consent-text"><strong>TIME INVOLVEMENT:</strong> Your participation will take approximately ${timeEstimate} minutes.</p>

<p class="consent-text"><strong>PAYMENTS:</strong> You will receive $${basePayment} as payment for your participation, as well as a bonus of up to $${maxBonus} depending on your performance.</p>

<p class="consent-text"><strong>PRIVACY AND CONFIDENTIALITY:</strong> The risks associated with this study are minimal. Study data will be stored securely, in compliance with Stanford University standards, minimizing the risk of confidentiality breach. Your individual privacy will be maintained during the research and in all published and written data resulting from the study.</p>

<p class="consent-text"><strong>CONTACT INFORMATION:</strong></p>
<p class="consent-text"><emph>Questions:</emph> If you have any questions, concerns or complaints about this research, its procedures, risks and benefits, contact <strong>Ben Prystawski</strong> (<a href="mailto://benpry@stanford.edu">benpry@stanford.edu</a>) or the Protocol Director, Noah Goodman (ngoodman@stanford.edu).</p>

<p class="consent-text"><strong>Independent Contact:</strong> If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at 650-723-2480 or toll free at 1-866-680-2906, or email at irbnonmed@stanford.edu. You can also write to the Stanford IRB, Stanford University, 1705 El Camino Real, Palo Alto, CA 94306.</p>

<p class="consent-text">Please save or print a copy of this page for your records.</p>

<p class="consent-text">If you agree to participate in this research, please click "I agree" below.</p>`;

// export const instructionPages = [
//   `<p class="instructions-text">This is an experiment about how people learn. You will complete a series of trials in which there are several buckets. One of the buckets will have a coin in it. You should <strong>click the bucket</strong> where you think the coin is.</p>
//    <p class="instructions-text">Different buckets have different probabilities of having the coin. Those probabilities are the same across trials. The image below shows an example where the coin is in the red bucket.</p>
//    <img src="assets/experiment-screenshot.png" class="instructions-img">`,
//   `<p class="instructions-text">The experiment consists of two phases: the <strong>learning phase</strong> and the <strong>test phase</strong>.</p>
//    <p class="instructions-text">In the learning phase, you will see where the coin was after each guess. In the test phase, you will not see the coin.</p>
//    <p class="instructions-text">One trial has been randomly chosen as the <emph>bonus trial</emph>. If you guess where the coin is correctly on the bonus trial, you will get a <strong>bonus of 50 cents</strong>. The bonus trial will be near the end, so you have time to learn where the coin might be. It could be in either the learning or test phase.</p>`,
//   `<p class="instructions-text">Another participant will do the same experiment after you with the <strong>same buckets</strong>.</p>
//    <p class="instructions-text">When you are done with the experiment, you will be prompted to <strong>write a message</strong> to help the next participant do well in the task. If the person who received your message guesses correctly on their bonus trial, you will earn an <strong>extra 50 cent bonus</strong>.</p>
//    <p class="instructions-text">The message can contain anything you think would be helpful to the next participant.</p>
//    <p class="instructions-text">Press "Next" to begin the learning trials.</p>
// `,
// ];

export const instructionPages = [
  `<p class="instructions-text">This is an experiment about how people learn. You will complete a series of trials in which there are several buckets. One of the buckets will have a coin in it. You should <strong>click the bucket</strong> where you think the coin is.</p>
   <p class="instructions-text">Different buckets have different probabilities of having the coin. Those probabilities are the same across trials. The image below shows an example where the coin is in the red bucket.</p>
   <img src="assets/experiment-screenshot.png" class="instructions-img">`,
  `<p class="instructions-text">You will <strong>read a message</strong>, then complete a <strong>test phase</strong>.</p>
   <p class="instructions-text">The message was written by a previous participant who observed the same buckets and saw where the coin was several times. In the test phase, you will be asked to predict where the coin is, but you will not get any feedback after making guesses.</p>
   <p class="instructions-text">One trial has been randomly chosen as the <emph>bonus trial</emph>. If you guess where the coin is correctly on the bonus trial, you will get a <strong>bonus of 50 cents</strong>.</p>`,
  `<p class="instructions-text">Press "Next" to see the message that a previous participant left for you.</p>`,
];

export const testPhaseInstructions = `<p class="instructions-text">You will now complete the test phase. Buckets will appear on the screen and you should click the bucket where you think the coin is.</p>
<p class="instructions-text">There will be a one second delay between trials.</p>
<p class="instructions-text">Press 'Begin' to start the test phase.</p>`;

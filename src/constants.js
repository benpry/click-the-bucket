import { marked } from "marked";
const consentMd = require("../assets/instructions/consent.md");
const instructionsMd = require("../assets/instructions/main-instructions.md");
const testPhaseInstructionsMd = require("../assets/instructions/test-phase-instructions.md");
const writeMessageMd = require("../assets/instructions/write-message-instructions.md");

const consentRenderer = new marked.Renderer();
consentRenderer.paragraph = (text) => `<p class="consent-text">${text}</p>`;

const instructionsRenderer = new marked.Renderer();
instructionsRenderer.paragraph = (text) => {
  if (text[0] == "<") {
    return text;
  } else {
    return `<p class="instructions-text">${text}</p>`;
  }
};

export const bucketHTML = `
<img src="assets/images/%choice%-bucket.svg", class="bucket">
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
    <img src="assets/images/coin.svg" class="coin" style="grid-column:${
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
  0: 3,
  1: 3,
  2: 3,
  3: 3,
};

export const messageConditionTimes = {
  0: 5,
  1: 10,
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

export const consentText = marked(eval("`" + consentMd.default + "`"), {
  renderer: consentRenderer,
});

export const getInstructionPages = (messageWritingTime) => {
  const instructionsHtml = marked(eval("`" + instructionsMd.default + "`"), {
    renderer: instructionsRenderer,
  });
  return instructionsHtml.split("<hr>");
};

export const testPhaseInstructions = marked(testPhaseInstructionsMd.default, {
  renderer: instructionsRenderer,
});

export const getWriteMessageInstructions = (messageWritingTime) => {
  return marked(eval("`" + writeMessageMd.default + "`"), {
    renderer: instructionsRenderer,
  });
};

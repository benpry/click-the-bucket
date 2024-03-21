/**
 * @title Where's the coin?
 * @description A learning experiment for humans
 * @version 0.1.0
 *
 * @assets assets/
 */

// You can import stylesheets (.scss or .css).
import "../styles/main.scss";
import HtmlButtonResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import PreloadPlugin from "@jspsych/plugin-preload";
import InstructionsPlugin from "@jspsych/plugin-instructions";
import HtmlButtonResponse from "@jspsych/plugin-html-button-response";
import HtmlSurveyText from "./survey-text-timed";
import { initJsPsych } from "jspsych";
import {
  instructionPages,
  bucketHTML,
  formatFeedback,
  messageConditionTimes,
  nTrialsByCondition,
  bucketsByCondition,
  consentText,
  testPhaseInstructions,
} from "./constants";
import { messages } from "./messages";
import { startTimer } from "./timer";
import { sampleBucket, renderMessage } from "./utils";
import { range } from "./utils";
import { proliferate } from "./proliferate";

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({
  assetPaths,
  input = {},
  environment,
  title,
  version,
}) {
  const jsPsych = initJsPsych({
    on_finish: function (data) {
      proliferate.submit({
        trials: data.values(),
      });
    },
  });
  const condition = jsPsych.data.getURLVariable("condition");
  const messageCondition = jsPsych.data.getURLVariable("messageCondition");
  const doLearning = jsPsych.data.getURLVariable("doL");
  const receiveMessage = jsPsych.data.getURLVariable("recM");
  const writeMessage = jsPsych.data.getURLVariable("wM");
  const nTrials = nTrialsByCondition[condition];
  const buckets = bucketsByCondition[condition].buckets;
  const bucketProbs = bucketsByCondition[condition].probs;
  const timeline = [];

  // Preload assets
  timeline.push({
    type: PreloadPlugin,
    images: assetPaths.images,
    audio: assetPaths.audio,
    video: assetPaths.video,
  });

  timeline.push({
    type: InstructionsPlugin,
    pages: [consentText],
    show_clickable_nav: true,
    button_label_next: "I consent",
  });

  timeline.push({
    type: InstructionsPlugin,
    pages: instructionPages,
    show_clickable_nav: true,
  });

  if (receiveMessage) {
    const messageNum = jsPsych.data.getURLVariable("mN");
    const message = messages[messageNum];
    timeline.push({
      type: HtmlButtonResponse,
      stimulus: renderMessage(message),
      choices: ["Continue"],
    });
  }

  if (doLearning) {
    timeline.push({
      type: HtmlButtonResponse,
      stimulus: `<p>You will now start the learning trials. Press "continue" to begin.</p>`,
      choices: ["Continue"],
    });

    const learningStages = [
      {
        type: HtmlButtonResponse,
        stimulus: "Click the bucket where you think the coin is",
        choices: buckets,
        data: function () {
          return { correctBucket: jsPsych.timelineVariable("correctBucket") };
        },
        button_html: bucketHTML,
      },
      {
        type: HtmlButtonResponse,
        stimulus: function () {
          const lastTrial = jsPsych.data.get().last(1).values()[0];
          const lastCorrectBucket = lastTrial["correctBucket"];
          const lastTrialCorrect =
            buckets[parseInt(lastTrial["response"])] == lastCorrectBucket;
          return formatFeedback(lastCorrectBucket, lastTrialCorrect, buckets);
        },
        choices: ["Continue"],
      },
    ];

    const learningTimeline = {
      timeline: learningStages,
      timeline_variables: range(nTrials).map((i) => {
        return {
          correctBucket: sampleBucket(buckets, bucketProbs),
        };
      }),
      randomize_order: true,
    };

    timeline.push(learningTimeline);
  }

  if (writeMessage) {
    const messageWritingTime = messageConditionTimes[messageCondition];
    const writeMessageInstructions = {
      type: HtmlButtonResponse,
      stimulus: `<p>You have completed the learning trials.</p>
    <p>You will now have ${messageWritingTime} seconds to write a message for the next participant.</p>
    <p>Your message writing time will begin in 5 seconds</p>`,
      choices: [],
      trial_duration: 5000,
    };
    timeline.push(writeMessageInstructions);
    const writeMessageTrial = {
      type: HtmlSurveyText,
      questions: [
        {
          prompt: "Please write a message to help the next participant.",
          placeholder: "Type your message here",
          name: "message",
          rows: 8,
          columns: 60,
        },
      ],
      trial_duration: messageWritingTime * 1000,
    };
    timeline.push(writeMessageTrial);
  }

  timeline.push({
    type: HtmlButtonResponse,
    stimulus: testPhaseInstructions,
    choices: ["Begin"],
  });
  const testTrial = [
    {
      type: HtmlButtonResponse,
      stimulus: "Click the bucket where you think the coin is",
      choices: buckets,
      button_html: bucketHTML,
    },
    {
      type: HtmlButtonResponse,
      stimulus: "",
      trial_duration: 1000,
      choices: [],
    },
  ];
  const testTimeline = {
    timeline: testTrial,
    repetitions: 10,
  };
  timeline.push(testTimeline);

  const postExperimentSurvey = {
    type: HtmlSurveyText,
    preamble:
      "<p>Thank you for taking part in the experiment.</p><p>You will be redirected to Prolific after this survey. Please do not navigate away from this page.</p>",
    questions: [
      {
        prompt:
          "Please describe the strategy you used to answer the questions in this experiment.",
        rows: 6,
        columns: 50,
        name: "strategy",
      },
      {
        prompt: "Were any of the instructions unclear?",
        rows: 6,
        columns: 50,
        name: "instructions",
      },
      {
        prompt:
          "Please give any feedback you have about the experiment, including problems encountered.",
        rows: 6,
        columns: 50,
        name: "feedback",
      },
    ],
  };
  timeline.push(postExperimentSurvey);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  // return jsPsych;
}

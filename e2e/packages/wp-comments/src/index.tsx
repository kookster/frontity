import React from "react";
import Package from "../types";
import { connect } from "frontity";
import { Connect } from "frontity/types";

/**
 * A component that can send comments to the WordPress backend.
 *
 * @param props - Injected props by {@link connect}.
 * @returns React Element.
 */
const Component: React.FC<Connect<Package>> = ({ actions, state }) => {
  /**
   * Send a correct test comment.
   */
  const sendComment = () => {
    actions.comments.submit(1, {
      content: "Hello world!",
      authorEmail: "frontibotito@frontity.com",
      authorName: "Frontitbotito",
    });
  };

  /**
   * Send a sub-comment for a parent comment that exists by default.
   */
  const sendSubComment = () => {
    actions.comments.submit(1, {
      content: "Hello world!",
      authorEmail: "frontibotito@frontity.com",
      authorName: "Frontitbotito",
      parent: 1,
    });
  };

  /**
   * Send a comment with a non-existing ID.
   */
  const sendCommentWrongId = () => {
    actions.comments.submit(9999, {
      content: "Hello world!",
      authorEmail: "frontibotito@frontity.com",
      authorName: "Frontitbotito",
    });
  };

  /**
   * Send a comment without an email.
   */
  const sendCommentNoEmail = () => {
    actions.comments.submit(1, {
      content: "Hello world!",
      authorEmail: "",
      authorName: "Frontitbotito",
    });
  };

  /**
   * Fetch all the comments.
   */
  const fetchComments = () => {
    actions.source.fetch(`@comments/1`, { force: true });
  };

  return (
    <>
      <button id="comment-ok" onClick={sendComment}>
        Send correct comment
      </button>
      <button id="comment-wrong-id" onClick={sendCommentWrongId}>
        comment with a wrong ID
      </button>
      <button id="comment-no-email" onClick={sendCommentNoEmail}>
        comment with no email
      </button>
      <button id="sub-comment" onClick={sendSubComment}>
        sub-comment
      </button>

      <button id="fetch-comments" onClick={fetchComments}>
        fetch comments
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          actions.comments.submit(1);
        }}
      >
        <input
          name="content"
          type="text"
          placeholder="content"
          onChange={(e) =>
            actions.comments.updateFields(1, { content: e.target.value })
          }
          value={state.comments.forms[1]?.fields?.content || ""}
        />
        <input
          name="author_name"
          type="text"
          placeholder="author_name"
          onChange={(e) =>
            actions.comments.updateFields(1, { authorName: e.target.value })
          }
          value={state.comments.forms[1]?.fields?.authorName || ""}
        />
        <input
          name="author_email"
          type="text"
          placeholder="author_email"
          onChange={(e) =>
            actions.comments.updateFields(1, { authorEmail: e.target.value })
          }
          value={state.comments.forms[1]?.fields?.authorEmail || ""}
        />
        <input
          name="parent"
          type="number"
          placeholder="parent"
          onChange={(e) =>
            actions.comments.updateFields(1, {
              parent: e.target.value,
            })
          }
          value={state.comments.forms[1]?.fields?.parent || 0}
        />

        <input type="submit" />
      </form>

      <pre id="form">{JSON.stringify(state.comments.forms[1], null, 2)}</pre>
      <pre id="error-message">{state.comments.forms[1]?.errorMessage}</pre>
      <pre id="source">
        {JSON.stringify(state.source.data[`@comments/1/`], null, 2)}
      </pre>
    </>
  );
};

const WPCommentsPackage: Package = {
  name: "e2e-wp-comments",
  state: {
    comments: { forms: {} },
  },
  roots: {
    wpComments: connect(Component),
  },
  libraries: {},
};

export default WPCommentsPackage;
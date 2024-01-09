import React from "react";

const test = () => {
  return (
    <div>
      <form method="post" action="http://localhost:5288/upload" enctype="multipart/form-data">
        <input type="file" name="photo" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default test;

const output = document.getElementById("output");

function showResult(label, data) {
  const block = document.createElement("section");
  const title = document.createElement("h2");
  const pre = document.createElement("pre");

  title.textContent = label;
  pre.textContent = typeof data === "string" ? data : JSON.stringify(data, null, 2);

  block.appendChild(title);
  block.appendChild(pre);
  output.appendChild(block);
}

async function runExamples() {
  const getAllRes = await fetch("https://jsonplaceholder.typicode.com/posts");
  const getAllData = await getAllRes.json();
  showResult("GET /posts (first 3)", getAllData.slice(0, 3));
  console.log("GET /posts", getAllData);

  const getOneRes = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const getOneData = await getOneRes.json();
  showResult("GET /posts/1", getOneData);
  console.log("GET /posts/1", getOneData);

  const postRes = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "My first post",
      body: "Learning APIs",
      userId: 2,
    }),
  });
  const postData = await postRes.json();
  showResult("POST /posts", postData);
  console.log("POST /posts", postData);

  const patchRes = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "Updated title only",
    }),
  });
  const patchData = await patchRes.json();
  showResult("PATCH /posts/1", patchData);
  console.log("PATCH /posts/1", patchData);

  const putRes = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: 1,
      title: "Replaced post",
      body: "This replaces all fields",
      userId: 2,
    }),
  });
  const putData = await putRes.json();
  showResult("PUT /posts/1", putData);
  console.log("PUT /posts/1", putData);

  const deleteRes = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "DELETE",
  });
  showResult("DELETE /posts/1", `Status: ${deleteRes.status}`);
  console.log("DELETE /posts/1", deleteRes.status);
}

runExamples().catch((error) => {
  showResult("Error", error.message);
  console.error(error);
});
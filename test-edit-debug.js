// Quick test to debug the edit form issue
console.log("Testing project edit page debug");

// Test the query URL construction
const projectId = "9";
const queryKey = [`/api/projects/${projectId}`];
console.log("Query key:", queryKey);

// Test the API URL construction
const apiUrl = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/api/${cleanPath}`;
};

console.log("Constructed URL:", apiUrl(`projects/${projectId}`));
import './style.css'

async function loadArticles(orderBy = "created_at.asc") {
  try {
    const response = await fetch(`https://xfuezwjkwtojqxsrccge.supabase.co/rest/v1/article?select=title,subtitle,author,created_at,content&order=${orderBy}`, {
      method: 'GET',
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmdWV6d2prd3RvanF4c3JjY2dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NjU1MDQsImV4cCI6MjA2MzI0MTUwNH0.k3dEcZDYEVcQ3K-sSNu9AF9enL69utG14-JfK95FYAw',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmdWV6d2prd3RvanF4c3JjY2dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NjU1MDQsImV4cCI6MjA2MzI0MTUwNH0.k3dEcZDYEVcQ3K-sSNu9AF9enL69utG14-JfK95FYAw',
      }
    });

    if (!response.ok) {
      throw new Error('HTTP error');
    }

    const data = await response.json();
    displayArticles(data);

  } catch (error) {
    console.error('Błąd:', error);
    document.getElementById('articles-container').innerText = "Wystąpił błąd podczas ładowania artykułów.", + error.message;
  }
}

function displayArticles(articles) {
  const container = document.getElementById('articles-container');
  container.innerHTML = "";

  articles.forEach(article => {
    const div = document.createElement("div");
    div.className = "article-box";

    div.innerHTML = `
      <h2>${article.title}</h2>
      <h3>${article.subtitle}</h3>
      <p><strong>Autor:</strong> ${article.author}</p>
      <p><strong>Data:</strong> ${format(new Date(article.created_at), 'dd-MM-yyyy')}</p>
      <p>${article.content}</p>
    `;

    container.appendChild(div);
  });
}

loadArticles("created_at.asc");

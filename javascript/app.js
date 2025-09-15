document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('data-table-body')

  const fetchDataAndDisplay = async () => {
    try {
      const response = await fetch('https://zuplo-test.onrender.com/users', {})

      const data = await response.json()

      const rows = data.map(post => {
        return `
        <tr>
          <td>${post.name}</td>
          <td>${post.username}</td>
          <td>${post.email}</td>
        </tr>
        `
      }).join('')

      tableBody.innerHTML = rows

    } catch (err) {
      console.log('Error loading data', err);
      tableBody.innerHTML = '<tr><td colspan="3" class="text-center text-danger">Error Fetching Data</td></tr>'
    }
  }

  fetchDataAndDisplay()
})
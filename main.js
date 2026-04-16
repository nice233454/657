import './style.css'

window.toggleTask = function(btn) {
  const taskItem = btn.closest('.task-item')
  const isDone = taskItem.classList.contains('task-item--done')
  const timeEl = taskItem.querySelector('.task-time')

  taskItem.classList.add('task-item--animating')
  setTimeout(() => taskItem.classList.remove('task-item--animating'), 300)

  if (isDone) {
    taskItem.classList.remove('task-item--done')
    btn.classList.remove('task-check-btn--done')
    btn.innerHTML = '<i class="bi bi-circle"></i>'
    btn.title = 'Отметить выполненным'
    if (timeEl) {
      timeEl.classList.remove('task-time--done')
      const originalTime = taskItem.dataset.originalTime
      if (originalTime) {
        timeEl.innerHTML = originalTime
      }
    }
  } else {
    taskItem.classList.add('task-item--done')
    btn.classList.add('task-check-btn--done')
    btn.innerHTML = '<i class="bi bi-check-circle-fill"></i>'
    btn.title = 'Снять отметку'
    if (timeEl) {
      if (!taskItem.dataset.originalTime) {
        taskItem.dataset.originalTime = timeEl.innerHTML
      }
      timeEl.className = 'task-time task-time--done'
      timeEl.innerHTML = '<i class="bi bi-check2"></i> Выполнено'
    }
  }

  updateTaskCounter()
}

function updateTaskCounter() {
  const all = document.querySelectorAll('.task-item')
  const done = document.querySelectorAll('.task-item--done')
  const counter = document.getElementById('taskCounter')
  const pendingCount = document.getElementById('pendingCount')

  if (counter) {
    counter.textContent = `${done.length} из ${all.length} выполнено`
  }

  if (pendingCount) {
    const pending = all.length - done.length
    const forms = ['задача', 'задачи', 'задач']
    const label = pending === 1 ? forms[0] : (pending >= 2 && pending <= 4) ? forms[1] : forms[2]
    pendingCount.textContent = pending > 0 ? `${pending} ${label} не выполнены` : 'Все задачи выполнены!'
  }
}

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault()
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'))
    item.classList.add('active')
  })
})

document.querySelectorAll('.stat-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-2px)'
  })
  card.addEventListener('mouseleave', () => {
    card.style.transform = ''
  })
})

updateTaskCounter()

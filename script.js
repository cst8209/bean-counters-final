function createElement (type, props, ...children) {
  const $el = document.createElement(type)
  Object.keys(props).forEach(prop => $el[prop] = props[prop])
  $el.append(...children)
  return $el
}

function filterCounters (bean, counters) {
  return counters.filter(counter => counter.bean === bean)
}

function sortCounters (counters) {
  return counters.toSorted((a, b) => {
    if (a.name < b.name) {
      return -1
    } else if (a.name > b.name) {
      return 1
    }

    return 0;
  })
}

function totalCount (counters) {
  return counters.reduce((total, counter) => total + counter.count, 0)
}

const $main = document.getElementById('main')

const beans = []
counters.forEach(counter => 
  !beans.includes(counter.bean) && beans.push(counter.bean))

$main.innerHTML = ''
beans.forEach(bean => {
    const beanCounters = filterCounters(bean, counters) 
    $main.append(
      createElement('section', {className: 'bean'}, 
        createElement('h2', {}, `${bean} (${totalCount(beanCounters)})`),
        createElement('ol', {}, 
          ...sortCounters(beanCounters)
            .map(counter => 
              createElement('li', {}, `${counter.name} (${counter.count})`))
        )
      )
    )
  }
)
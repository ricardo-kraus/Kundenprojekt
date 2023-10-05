```javascript
ratings: {
    p1: {
        monday {
            t1: {
                negativeCount: <number>,
                positiveCount: <number>
            },
            t2: {
                negativeCount: <number>,
                positiveCount: <number>
            },
            t3: {
                negativeCount: <number>,
                positiveCount: <number>
            },
        },
        tuesday {
            t1: {
                negativeCount: <number>,
                positiveCount: <number>
            },
            t2: {
                negativeCount: <number>,
                positiveCount: <number>
            },
            t3: {
                negativeCount: <number>,
                positiveCount: <number>
            },
        },
        wednesday: {
            t1: {
                negativeCount: <number>,
                positiveCount: <number>
            }
        }
    },
    p2: {
        negativeCount: <number>,
        positiveCount: <number>
    },
}
```

```javascript
const oldValue = 'negative' // todo get from event or other source

const ratingValue = 'positive' // can also be "negative"

const personName = 'p1'; // done
const day = 'monday'; // done

const task = 't1'; // todo task still needs to be gotten from somewhere

// check presence of all ratings for all days for all tasks of selected person
if (!ratings[personName]) {
    ratings[personName] = {}
}
// check presence of all ratings for seltected person of selected day
if (!ratings[personName][day]) {
    ratings[personName][day] = {}
}
// check all ratings for selected person on selected day for selected task
if (!ratings[personName][day][task]) {
    ratings[personName][day][task] = {
        negativeCount: 0,
        positiveCount: 0
    }
}

ratings[personName][day][task][ratingValue + 'Count'] += 1

// check if old value was neutral
if (oldValue !== 'neutral') {
    correctionName = ratingValue === 'positive' ? 'negative' : 'positive'
    ratings[personName][day][task][correctionName + 'Count'] -= 1
}


```
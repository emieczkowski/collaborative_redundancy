import random
import json

def generate_neighborhood(id, client_name):
    # 1. pick number of houses (4-6) and whole-number average people (2-5)
    num_houses = random.randint(4, 6)
    avg_people = random.randint(2, 5)
    total_people = num_houses * avg_people

    # 2. distribute total_people across houses, each at least 1 person
    distribution = []
    remaining = total_people
    for i in range(num_houses):
        min_count = 1
        max_count = remaining - (num_houses - i - 1)
        count = random.randint(min_count, max_count)
        distribution.append(count)
        remaining -= count

    # 3. build houses with random residents
    age_groups = ["child", "adult", "elderly"]
    houses = []
    for count in distribution:
        residents = []
        for _ in range(count):
            residents.append({
                "ageGroup": random.choice(age_groups),
                "income": random.randint(0, 80000),
                "commuteDistance": random.randint(0, 20)
            })
        houses.append({"residents": residents})

    return {
        "id": id,
        "clientName": client_name,
        "houses": houses
    }

names = [
    "Hastings Metropolis",
    "Convex Corner",
    "Hessian Heights",
    "Polynomial Park",
    "Euler Estates",
    "Bayesian Borough"
]

tasks = [generate_neighborhood(i + 7, names[i]) for i in range(6)]

file_path = "generated_tasks.js"
with open(file_path, "w") as f:
    f.write("export const generatedTasks = ")
    json.dump(tasks, f, indent=2)
    f.write(";")
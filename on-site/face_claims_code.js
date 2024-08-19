async function parseHtmlResponse(response) {
    const parser = new DOMParser();
    return parser.parseFromString(await response.text(), 'text/html');
}

async function getCurrentMembers() {
    function buildFormData(obj) {
        const formData = new FormData();
        Object.entries(obj).forEach(([key, value]) => {
            formData.append(key, value);
        })
        return formData;
    }

    const formData = buildFormData({
        name: "",
        filter: "ALL",
        sort_key: "name",
        sort_order: "asc",
        max_results: "1000",
    });

    const members = await parseHtmlResponse(
        await fetch(
            "https://astonish.jcink.net/index.php?act=Members&max_results=10",
            {
                method: "POST",
                body: formData,
            }
        )
    )

    const memArr = [];
    const allStrat = members.querySelectorAll(".memberlist-display-strategos .char-name");
    const allThia = members.querySelectorAll(".memberlist-display-thiarchos .char-name");
    const allKris = members.querySelectorAll(".memberlist-display-krisigos .char-name");
    const allMnem = members.querySelectorAll(".memberlist-display-mnemntia .char-name");
    const allSoph = members.querySelectorAll(".memberlist-display-sophist .char-name");

    allStrat.forEach(mem => {
        memArr.push({
            name: mem.innerText,
            faceClaim: mem.dataset.fc,
            profLink: mem.querySelector("a").getAttribute("href"),
            job: mem.dataset.job,
            group: "strat",
        });
    });

    allThia.forEach(mem => {
        memArr.push({
            name: mem.innerText,
            faceClaim: mem.dataset.fc,
            profLink: mem.querySelector("a").getAttribute("href"),
            job: mem.dataset.job,
            group: "thia",
        });
    });

    allKris.forEach(mem => {
        memArr.push({
            name: mem.innerText,
            faceClaim: mem.dataset.fc,
            profLink: mem.querySelector("a").getAttribute("href"),
            job: mem.dataset.job,
            group: "kris",
        });
    });

    allMnem.forEach(mem => {
        memArr.push({
            name: mem.innerText,
            faceClaim: mem.dataset.fc,
            profLink: mem.querySelector("a").getAttribute("href"),
            job: mem.dataset.job,
            group: "mnemn",
        });
    });

    allSoph.forEach(mem => {
        memArr.push({
            name: mem.innerText,
            faceClaim: mem.dataset.fc,
            profLink: mem.querySelector("a").getAttribute("href"),
            job: mem.dataset.job,
            group: "soph",
        });
    });

    return memArr.sort((m1, m2) =>
        (m1.faceClaim > m2.faceClaim) ? 1 : (m1.faceClaim < m2.faceClaim) ? -1 : 0);
}

getCurrentMembers().then(members => {
    const claimsList = document.querySelector(".char-claims-list");
    claimsList.style.gridTemplate = `repeat(${members.length}, auto/1fr 1fr 1fr;`;

    members.forEach(mem => {
        const claimDiv = document.createElement("div");
        const nameDiv = document.createElement("div");
        const profAnchor = document.createElement("a");
        const jobDiv = document.createElement("div");

        claimDiv.classList.add("claim-entry");
        nameDiv.classList.add("claim-entry");
        jobDiv.classList.add("claim-entry");
        profAnchor.classList.add(`claim-${mem.group}`);

        claimDiv.innerText = mem.faceClaim;
        profAnchor.innerText = mem.name;
        profAnchor.setAttribute("href", mem.profLink);
        jobDiv.innerText = mem.job;

        nameDiv.append(profAnchor);
        claimsList.append(claimDiv);
        claimsList.append(nameDiv);
        claimsList.append(jobDiv);
    })
})

// Reserve list code
async function getClaimsList() {
    // Uses the "Download/Print Topic" option to fetch HTML of all posts in the thread
    const doc = await parseHtmlResponse(
        // change link to match topic's given url
        await fetch("https://astonish.jcink.net/index.php?act=Print&client=wordr&f=89&t=1041")
    )

    let claimsArr = [];
    const posts = doc.querySelectorAll("table");
    const currentDate = Date.now();

    // Check date for all posts. If over 3 days have elapsed, don't add the claim to the list.
    for (let i = 0; i < posts.length; i++) {
        let dateLine = posts[i].querySelector("td").innerText;

        let postDate = (dateLine.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/) ?? [])[0];
        const date = new Date(postDate).valueOf();

        if ((currentDate - date) / (1000 * 60 * 60 * 24) < 3) {
            claimsArr.push(posts[i].querySelector(".reservation"));
        }
    }

    return claimsArr;
}

// Display list of claims in top post
getClaimsList().then(claimsArr => {
    const resListContainer = document.getElementById("reservation-list");
    claimsArr.forEach(fc => resListContainer.append(fc));
})
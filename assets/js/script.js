let say;
let allData = [];

fetch("https://raw.githubusercontent.com/TheOksigen/purfect_data/refs/heads/main/country.json")
    .then(res => res.json())
    .then(data => {
        allData = data;
        renderRegionCounts(data);
        logo();
    });

function renderCards(data) {
    const container = document.getElementById("cards-container");
    let html = ""

    data.forEach(item => {
        html += `<div class="w-[calc((100%-60px)/4)] bg-white border border-green-300 rounded-3xl shadow-lg p-[24px_12px] relative flex flex-col items-center">
                <div class="h-24 w-48 rounded-full overflow-hidden border border-gray-300 shadow-md -mt-20">
                    <img src="${item.flag}" alt="" class="w-full h-full object-cover">
                </div>
                <div class="mt-6 w-full flex flex-col items-center gap-3">
                    <h2 class="text-3xl font-extrabold text-green-900">
                        ${item.name} <span class="text-lg text-gray-500 font-semibold">[${item.alpha2Code}]</span>
                    </h2>
                    <p class="text-gray-600">
                        Native: <span class="font-semibold text-green-800">${item.nativeName}</span>
                    </p>
                    <div class="flex items-center justify-between w-full text-[16px] text-green-800 font-medium">
                        <div class="flex flex-col items-start gap-[6px]">
                            <span class="bg-[#f0ffe4] p-[3px_15px] text-green-800 rounded-full">📍 ${item.capital}</span>
                            <span class="bg-[#f0ffe4] p-[3px_15px] text-green-800 rounded-full">🌍 ${item.region}</span>
                            <span class="bg-[#f0ffe4] p-[3px_15px] text-green-800 rounded-full">👥 ${item.population.toLocaleString()}</span>
                        </div>
                        <a href="./pages/country.html?alpha=${item.alpha3Code}" target="_blank" class="h-fit px-5 py-2 rounded-full bg-green-100 text-green-800 font-semibold border border-green-300 cursor-pointer hover:bg-green-200 hover:scale-105 transition-all duration-200 shadow backdrop-blur-sm">
                            <i class="fa-solid fa-angle-right"></i> More</a>
                    </div>
                </div> </div>`;
    });
    container.innerHTML = html
}

function logo () {
    say = 20;
    renderCards(allData.slice(0, say));
    document.getElementById("show-more-btn").style.display = "block";
    document.getElementById("sect-title").innerHTML =
        `<span>✨</span> <h2 class="font-semibold">Around the World: 250 Countries</h2> <span>✨</span>`;
    renderCountryCard(getRandomCountry(allData), allData.length);
}logo()

document.getElementById("sect-title").innerHTML = `<span>✨</span> <h2 class="font-semibold">Around the World: 250 Countries</h2> <span>✨</span>`

function getRandomCountry(d) {
    const rnd = Math.floor(Math.random() * d.length);
    return d[rnd];
}

function renderCountryCard(country, sourceLength) {
    document.getElementById("country-container").innerHTML = `<div class="flex items-center gap-2 text-3xl text-gray-400"><span>✨</span> <h2 class="font-semibold">Today's Random Country</h2> <span>✨</span></div>
                                                                <a href="./pages/country.html?alpha=${country?.alpha3Code ?? ''}" target="_blank" class="block w-[60%]">
                                                                    <div class="aspect-[4/2] bg-gradient-to-tr from-yellow-50 via-amber-100 to-yellow-200 rounded-3xl shadow-2xl overflow-hidden relative flex items-center justify-center">
                                                                        <div class="absolute inset-0 opacity-20 bg-center bg-cover" style="background-image: url('${country?.flags?.svg ?? ""}');"></div>
                                                                        <div class="relative w-[90%] text-gray-800">
                                                                            <div class="flex items-center gap-5 ml-4">
                                                                                <img src="${country?.flags?.svg ?? ""}" alt="" class="w-28 rounded shadow-md border border-gray-300" />
                                                                                <h1 class="text-4xl font-bold flex items-center gap-3">🇦🇫 ${country.name}</h1>
                                                                            </div>
                                                                            <p class="text-lg ml-4 italic text-gray-600 mt-2">"${country?.nativeName ?? "Yoxdur"}"</p>
                                                                            <div class="grid grid-cols-2 gap-6 mt-8 text-[20px]">
                                                                                <p class="flex gap-2">📍 <strong>Paytaxt:</strong> ${country?.capital ?? "Yoxdur"}</p>
                                                                                <p class="flex gap-2">🌏 <strong>Region:</strong> ${country?.region ?? "Yoxdur"} (${country?.subregion ?? "Yoxdur"})</p>
                                                                                <p class="flex gap-2">👥 <strong>Əhali:</strong> ${country?.population?.toLocaleString?.() ?? "Yoxdur"}</p>
                                                                                <p class="flex gap-2">📐 <strong>Saat qurşağı:</strong> ${country?.timezones?.[0] ?? "Yoxdur"}</p>
                                                                                <p class="flex gap-2">💰 <strong>Valyuta:</strong> ${country?.currencies?.[0]?.name ?? "Yoxdur"} (${country?.currencies?.[0]?.symbol ?? "Yoxdur"})</p>
                                                                                <p class="flex gap-2">📞 <strong>Telefon Kodu:</strong> +${country?.callingCodes?.[0] ?? "Yoxdur"}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </a><div class="mt-6 text-sm italic text-gray-500">📌 Bu card ${sourceLength} ölkə içindən təsadüfi seçilib</div>`;
}
renderCountryCard(getRandomCountry());

function showMoreFilter() {
    const section = document.getElementById('filter-section');

    if (section.classList.contains('h-[0px]')) {
        section.classList.remove('h-[0px]');
        section.classList.add('h-[300px]');
    } else {
        section.classList.remove('h-[300px]');
        section.classList.add('h-[0px]');
    }
}

function renderRegionCounts(data) {
    const uniqueRegions = [...new Set(data.map(item => item.region))];
    console.log(uniqueRegions);

    let regionCounts = uniqueRegions.map(region => {
        const c = data.filter(item => item.region == region).length;
        return { name: region, count: c };
    });

    const filteredRegions = regionCounts.filter(r => r.count != 1);
    filteredRegions.push({ name: "Antarctic", count: 3 });

    let leftHTML = "";
    let rightHTML = "";

    filteredRegions.forEach((r, i) => {
        const html = `<li>
        <a href="#" onclick="filterByRegion('${r.name}')" class="text-[#2d5435]">
            ${r.name} (${r.count})
        </a>
    </li>`; if (i < 3) {
            leftHTML += html;
        } else {
            rightHTML += html;
        }
    });

    document.getElementById("h-left").innerHTML = leftHTML;
    document.getElementById("h-right").innerHTML = rightHTML;
}

function showMore() {
    say += 64;
    const visibleData = allData.slice(0, say);
    renderCards(visibleData);

    if (say >= allData.length) {
        document.getElementById("show-more-btn").style.display = "none";
    }
}


function filterByRegion(region) {
    let filtered;

    if (region === "Antarctic") {
        filtered = allData.filter(item =>
            item.region === "Antarctic" ||
            item.region === "Polar" ||
            item.region === "Antarctic Ocean"
        );
    } else if (region) {
        filtered = allData.filter(item => item.region === region);
    } 

    renderCards(filtered);
    document.getElementById("show-more-btn").style.display = "none";

    if (!region) {
        document.getElementById("sect-title").innerHTML =
            `<span>✨</span> <h2 class="font-semibold">Around the World: 250 Countries</h2> <span>✨</span>`;
    } else {
        let titleText = region === "Antarctic"
            ? `❄️ Countries in Antarctica`
            : `🌏 Countries in ${region}`;
        document.getElementById("sect-title").innerHTML =
            `<h2 class="font-semibold">${titleText}</h2>`;
    }
    renderCountryCard(getRandomCountry(filtered), filtered.length);
}
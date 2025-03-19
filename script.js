document.addEventListener("DOMContentLoaded", () => {
    const contentDiv = document.getElementById("content");
    const files = [
        "1.md", "2.md", "3.md", "4.md", "5.md",
        "6.md", "7.md", "8.md", "9.md", "10.md",
        "11.md", "12.md", "13.md", "14.md", "15.md"
    ];

    async function loadMarkdownFiles() {
        contentDiv.innerHTML = ""; // Xóa "Loading documents..."

        files.forEach(async (file, index) => {
            try {
                let response = await fetch(file);
                if (!response.ok) throw new Error(`Failed to load ${file}`);
                let text = await response.text();
                let html = marked.parse(text);

                // Tạo khối nội dung
                let section = document.createElement("section");
                section.classList.add("collapsible");

                // Tạo nút mở rộng/thu gọn
                let toggleButton = document.createElement("button");
                toggleButton.classList.add("toggle-button");
                toggleButton.innerHTML = `<i class="fa-solid fa-chevron-down"></i> ${file.replace(".md", "")}`;
                toggleButton.addEventListener("click", () => {
                    section.classList.toggle("collapsed");
                    let icon = toggleButton.querySelector("i");
                    icon.classList.toggle("fa-chevron-down");
                    icon.classList.toggle("fa-chevron-up");
                });

                // Nội dung Markdown
                let contentWrapper = document.createElement("div");
                contentWrapper.classList.add("content");
                contentWrapper.innerHTML = html;

                // Mặc định chỉ mở file đầu tiên
                // if (index > 0) {
                //     section.classList.add("collapsed");
                // }

                section.appendChild(toggleButton);
                section.appendChild(contentWrapper);
                contentDiv.appendChild(section);
            } catch (error) {
                console.error("Error:", error);
            }
        });
    }

    loadMarkdownFiles();
});

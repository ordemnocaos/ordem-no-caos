import glob
import time

import requests
import yaml

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    )
}


def parse_front_matter(path):
    with open(path, encoding="utf-8") as f:
        content = f.read()
    if not content.startswith("---"):
        return None
    parts = content.split("---", 2)
    if len(parts) < 3:
        return None
    try:
        data = yaml.safe_load(parts[1])
    except yaml.YAMLError:
        return None
    return data or {}


def check_link(url):
    try:
        resp = requests.get(url, headers=HEADERS, timeout=12, allow_redirects=True)
        status = resp.status_code
        if 200 <= status < 400:
            return "ativo", status
        if status in (404, 410):
            return "quebrado", status
        return "nao_verificavel", status
    except requests.RequestException as exc:
        return "nao_verificavel", type(exc).__name__


def format_section(title, emoji, entries, empty_msg):
    lines = [f"\n## {emoji} {title} ({len(entries)})\n"]
    if entries:
        lines.extend(f"- {e}" for e in entries)
    else:
        lines.append(f"_{empty_msg}_")
    return lines


def main():
    files = sorted(glob.glob("_promocoes/*.md"))
    ativos, quebrados, nao_verificaveis = [], [], []

    for path in files:
        data = parse_front_matter(path)
        if not data or "link_afiliado" not in data:
            continue
        nome = data.get("nome", path)
        link = data["link_afiliado"]
        group, detail = check_link(link)
        entry = f"**{nome}**  \n  {link}  \n  status: `{detail}`"
        if group == "ativo":
            ativos.append(entry)
        elif group == "quebrado":
            quebrados.append(entry)
        else:
            nao_verificaveis.append(entry)
        time.sleep(1)  # não martelar os servidores das lojas

    total = len(ativos) + len(quebrados) + len(nao_verificaveis)

    lines = [
        "# Verificação de links de afiliado",
        "",
        f"Total de produtos verificados: **{total}**",
    ]
    lines += format_section("Ativos", "✅", ativos, "nenhum")
    lines += format_section("Quebrados — precisam de ação", "❌", quebrados, "nenhum 🎉")
    lines += format_section("Não verificáveis — checar manualmente", "⚠️", nao_verificaveis, "nenhum")

    with open("relatorio-links.md", "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"Relatório gerado: {total} produtos, {len(quebrados)} quebrados, {len(nao_verificaveis)} não verificáveis.")


if __name__ == "__main__":
    main()

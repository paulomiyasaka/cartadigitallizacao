<?php
<<<<<<< HEAD:controle/htmlTemplateEditor.php
=======
namespace Carta;


>>>>>>> origin/main:src/htmlTemplateEditor.php
class HtmlTemplateEditor
{
    private string $filePath;
    private \DOMDocument $dom;
    private \DOMXPath $xpath;
    private string $encoding = 'UTF-8';

    public function __construct(string $filePath)
    {
        if (!is_readable($filePath)) {
            throw new \InvalidArgumentException("Arquivo não encontrado ou não legível: {$filePath}");
        }
        $this->filePath = $filePath;
        $this->load();
    }

    private function load(): void
    {
        $html = file_get_contents($this->filePath);
        $this->dom = new \DOMDocument('1.0', $this->encoding);
        libxml_use_internal_errors(true);
        // Preserva acentuação e evita warnings com HTML5 parcial
        $this->dom->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        libxml_clear_errors();
        $this->xpath = new \DOMXPath($this->dom);
    }

    public function replaceBySelector(string $cssSelector, string $newHtml): int
    {
        // Suporte básico a seletores simples: tag, #id, .class
        $nodes = $this->selectNodes($cssSelector);
        $count = 0;
        foreach ($nodes as $node) {
            $fragment = $this->dom->createDocumentFragment();
            $fragment->appendXML($newHtml);
            // Remove filhos antigos e insere novo conteúdo
            while ($node->firstChild) {
                $node->removeChild($node->firstChild);
            }
            $node->appendChild($fragment);
            $count++;
        }
        return $count;
    }

    public function replacePlaceholder(string $placeholder, string $value): int
    {
        $xpath = "//text()[contains(., '{$placeholder}')]";
        $nodes = $this->xpath->query($xpath);
        $count = 0;
        foreach ($nodes as $textNode) {
            $textNode->nodeValue = str_replace($placeholder, $value, $textNode->nodeValue);
            $count++;
        }
        return $count;
    }

    private function selectNodes(string $selector)
    {
        if (strpos($selector, '#') === 0) {
            $id = substr($selector, 1);
            return $this->xpath->query("//*[@id='{$id}']");
        }
        if (strpos($selector, '.') === 0) {
            $class = substr($selector, 1);
            return $this->xpath->query("//*[contains(concat(' ', normalize-space(@class), ' '), ' {$class} ')]");
        }
        // tag selector
        return $this->xpath->query("//{$selector}");
    }

    public function saveAs(string $targetPath): void
    {
        $html = $this->dom->saveHTML();
        if (file_put_contents($targetPath, $html) === false) {
            throw new \RuntimeException("Falha ao salvar em {$targetPath}");
        }
    }
}

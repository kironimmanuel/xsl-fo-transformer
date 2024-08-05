# README: Verwendung von `javax` zur Verarbeitung von XML-Dateien

## Überblick

In Java bieten die `javax`-Pakete eine Vielzahl von Möglichkeiten zur Verarbeitung von XML-Dateien. Diese Pakete ermöglichen es Ihnen, XML-Daten zu analysieren, zu transformieren und zu erstellen. Im Folgenden finden Sie eine Übersicht der wichtigsten `javax`-Pakete für die XML-Verarbeitung:

## Wichtige Pakete

1.  **`javax.xml.parsers`**

    -   **Funktion**: Bietet Klassen für das Parsen von XML-Daten.
    -   **Beispiel**: `DocumentBuilderFactory` und `DocumentBuilder` werden verwendet, um XML-Dokumente zu erstellen und zu analysieren.

    ```java
    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
    DocumentBuilder builder = factory.newDocumentBuilder();
    Document document = builder.parse(new File("input.xml"));
    ```

2.  **`javax.xml.transform`**

    -   **Funktion**: Ermöglicht die Transformation von XML-Daten mithilfe von XSLT.
    -   **Beispiel**: `TransformerFactory` und `Transformer` werden verwendet, um XML-Daten in ein anderes Format zu transformieren.

    ```java
    TransformerFactory factory = TransformerFactory.newInstance();
    Transformer transformer = factory.newTransformer(new StreamSource("stylesheet.xsl"));
    transformer.transform(new StreamSource("input.xml"), new StreamResult("output.xml"));

    ```

3.  **`javax.xml.xpath`**

    -   **Funktion**: Bietet Klassen für die Auswertung von XPath-Ausdrücken in XML-Daten.
    -   **Beispiel**: `XPathFactory` und `XPath` werden verwendet, um XPath-Ausdrücke auf XML-Daten anzuwenden.

    ```java
    XPathFactory factory = XPathFactory.newInstance();
    XPath xpath = factory.newXPath();
    XPathExpression expression = xpath.compile("//book[price>35]/title/text()");
    NodeList result = (NodeList) expression.evaluate(document, XPathConstants.NODESET);
    ```

4.  **`javax.xml.stream`**

    -   **Funktion**: Bietet eine API für das Lesen und Schreiben von XML-Daten in einem ereignisgesteuerten Modell.
    -   **Beispiel**: `XMLInputFactory` und `XMLStreamReader` werden verwendet, um XML-Daten zu lesen.

    ```java
        XMLInputFactory factory = XMLInputFactory.newInstance();
        XMLStreamReader reader = factory.createXMLStreamReader(new FileReader("input.xml"));
        while (reader.hasNext()) {
            reader.next();
            if (reader.isStartElement()) {
                System.out.println(reader.getLocalName());
            }
        }

    XMLInputFactory inputFactory = XMLInputFactory.newInstance();
    XMLEventReader reader = inputFactory.createXMLEventReader(new FileReader("input.xml"));
    ```

5.  **`javax.xml.bind`**

    -   **Funktion**: Bietet Klassen für die Bindung von Java-Objekten an XML-Daten.
    -   **Beispiel**: `JAXBContext` und `Marshaller` werden verwendet, um Java-Objekte in XML-Daten zu konvertieren.

    ```java
    JAXBContext context = JAXBContext.newInstance(Book.class);
    Marshaller marshaller = context.createMarshaller();
    marshaller.marshal(book, new File("output.xml"));
    ```

6.  **`javax.xml.validation`**

    -   **Funktion**: Bietet Klassen für die Validierung von XML-Daten.
    -   **Beispiel**: `SchemaFactory` und `Validator` werden verwendet, um XML-Daten gegen ein XML-Schema zu validieren.

    ```java
    SchemaFactory factory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
    Schema schema = factory.newSchema(new File("schema.xsd"));
    Validator validator = schema.newValidator();
    validator.validate(new StreamSource("input.xml"));
    ```

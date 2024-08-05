
import org.w3c.dom.*;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class XmlToObjectParser {

    public static TransformedItems parseTransformedXml(String xmlContent) throws Exception {
        InputStream inputStream = new ByteArrayInputStream(xmlContent.getBytes());
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document doc = builder.parse(inputStream);
        doc.getDocumentElement().normalize();

        TransformedItems transformedItems = new TransformedItems();
        List<CustomItem> itemList = new ArrayList<>();

        NodeList nodeList = doc.getElementsByTagName("customItem");
        for (int i = 0; i < nodeList.getLength(); i++) {
            Node node = nodeList.item(i);
            if (node.getNodeType() == Node.ELEMENT_NODE) {
                Element element = (Element) node;

                CustomItem customItem = new CustomItem();
                customItem.setName(getTagValue("customName", element));
                customItem.setDescription(getTagValue("customDescription", element));

                itemList.add(customItem);
            }
        }

        transformedItems.setItems(itemList);
        return transformedItems;
    }

    private static String getTagValue(String tag, Element element) {
        NodeList nodeList = element.getElementsByTagName(tag).item(0).getChildNodes();
        Node node = nodeList.item(0);
        return node.getNodeValue();
    }

    public static void main(String[] args) {
        try {
            String xmlFilePath = "src/java/form.xml";
            String xsltFilePath = "src/java/layout.xml";

            // Step 1: Transform XML
            String transformedXml = XmlTransformer.transformXml(xmlFilePath, xsltFilePath);

            // Step 2: Parse transformed XML
            TransformedItems transformedItems = parseTransformedXml(transformedXml);

            // Print or use transformedItems
            for (CustomItem item : transformedItems.getItems()) {
                System.out.println("Name: " + item.getName() + ", Description: " + item.getDescription());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

class TransformedItems {
    private List<CustomItem> items;

    // Getter and setter
    public List<CustomItem> getItems() {
        return items;
    }

    public void setItems(List<CustomItem> items) {
        this.items = items;
    }
}

class CustomItem {
    private String name;
    private String description;

    // Getter and setter
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
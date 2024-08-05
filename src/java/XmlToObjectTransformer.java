import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class XmlToObjectTransformer {

    public static TransformedItems parseTransformedXml(String xmlFilePath) throws Exception {
        File file = new File(xmlFilePath);
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document doc = builder.parse(file);
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
            String xmlFilePath = "./src/java/layout.xml";
            TransformedItems transformedItems = parseTransformedXml(xmlFilePath);

            // Print or use transformedItems
            for (CustomItem item : transformedItems.getItems()) {
                System.out.println("Name: " + item.getName() + ", Description: " + item.getDescription());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

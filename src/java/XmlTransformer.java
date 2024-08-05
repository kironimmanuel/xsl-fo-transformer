import javax.xml.transform.*;
import javax.xml.transform.stream.StreamSource;
import javax.xml.transform.stream.StreamResult;
import java.io.File;
import java.io.StringWriter;

public class XmlTransformer {

    public static String transformXml(String xmlFilePath, String xsltFilePath) throws TransformerException {
        // Load XML and XSLT files
        Source xmlSource = new StreamSource(new File(xmlFilePath));
        Source xsltSource = new StreamSource(new File(xsltFilePath));

        // Create a TransformerFactory
        TransformerFactory factory = TransformerFactory.newInstance();

        // Create a Transformer from the XSLT
        Transformer transformer = factory.newTransformer(xsltSource);

        // Perform the transformation
        StringWriter writer = new StringWriter();
        transformer.transform(xmlSource, new StreamResult(writer));

        // Return the result as a String
        return writer.toString();
    }

    public static void main(String[] args) {
        try {
            String xmlFilePath = "./src/java/form.xml";
            String xsltFilePath = "./src/java/input.xsl";

            String transformedXml = transformXml(xmlFilePath, xsltFilePath);
            System.out.println(transformedXml);
        } catch (TransformerException e) {
            e.printStackTrace();
        }
    }
}

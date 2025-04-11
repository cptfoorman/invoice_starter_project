package cz.itnetwork.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import cz.itnetwork.entity.PersonEntity;
import java.util.Date;

@Entity(name = "invoice")
@Getter
@Setter
public class InvoiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, name = "invoiceNumber")
    private int invoiceNumber;

    @Column(nullable = false)
    private Date issued;

    @Column(nullable = false, name = "dueDate")
    private Date dueDate;

    @Column(nullable = false)
    private String product;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    private int vat;

    @Column(nullable = false)
    private String note;

    @ManyToOne
    private PersonEntity buyer;

    @ManyToOne
    private PersonEntity seller;


}

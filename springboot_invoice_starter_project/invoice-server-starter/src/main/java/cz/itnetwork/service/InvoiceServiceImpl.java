package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.mapper.InvoiceMapper;
import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.filter.InvoiceBuyerSellerFilter;
import cz.itnetwork.entity.filter.InvoiceFilter;
import cz.itnetwork.entity.repository.InvoiceRepository;
import cz.itnetwork.entity.repository.specification.InvoiceBuyerSellerSpecification;
import cz.itnetwork.entity.repository.specification.InvoiceSpecification;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvoiceServiceImpl implements InvoiceService{


    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private InvoiceMapper invoiceMapper;


    /*
    * fetches a specific invoice according to the id given
    * @params id = Invoice id
    * @return InvoiceDTO*/
    @Override
    public InvoiceDTO getInvoice(long id) {
        return invoiceMapper.toDTO(invoiceRepository.getReferenceById(id));
    }

    /*
    * fetches all invoices from the database according to filters
    * @params InvoiceFilter
    * @return List<InvoiceDTO>*/
    @Override
    public List<InvoiceDTO> getAllInvoices(InvoiceFilter invoiceFilter) {
        InvoiceSpecification invoiceSpecification = new InvoiceSpecification(invoiceFilter);
        return invoiceRepository.findAll(invoiceSpecification, PageRequest.of(0,invoiceFilter.getLimit()))
                .stream()
                .map(i -> invoiceMapper.toDTO(i))
                .collect(Collectors.toList());
    }

    /*
    * deletes an invoice according to the id
    * @params id = Invoice id
    * @return HttpStatus NO_CONTENT on success or NOT_FOUND*/
    @Override
    public HttpStatus removeInvoice(long id) {
        try{
            InvoiceEntity invoice = invoiceMapper.toEntity(getInvoice(id));
            invoiceRepository.delete(invoice);
            return HttpStatus.NO_CONTENT;
        }catch(NotFoundException ignored){
            return HttpStatus.NOT_FOUND;
        }

    }

    /*
    * adds invoice
    * @params InvoiceDTO
    * @return saved InvoiceDTO*/
    @Override
    public InvoiceDTO addInvoice(InvoiceDTO invoiceDTO) {
        InvoiceEntity newInvoiceEntity = invoiceMapper.toEntity(invoiceDTO);
        invoiceRepository.save(newInvoiceEntity);
        return invoiceMapper.toDTO(newInvoiceEntity);
    }


    /*
     * edits an invoice
     * @params id = Invoice Id
     * @params InvoiceDTO
     * @return newly saved InvoiceDTO
     * @throws EntityNotFoundExeption*/
    @Override
    public InvoiceDTO editInvoice(long id, InvoiceDTO invoiceDTO) {
        if (!invoiceRepository.existsById(id)) {
            throw new EntityNotFoundException("Invoice with id " + id + " wasn't found in the database.");
        }
        InvoiceEntity entity = invoiceMapper.toEntity(invoiceDTO);
        entity.setId(id);
        InvoiceEntity saved = invoiceRepository.save(entity);
        return invoiceMapper.toDTO(saved);
    }

    /*
     * fetches buyer invoices by identification number
     * @params String identificationNumber = identification number of the selected person
     * @return List<InvoiceDTO>*/
    @Override
    public List<InvoiceDTO> getBuyersByIdNum(String identificationNumber) {
        InvoiceBuyerSellerFilter invoiceFilter = new InvoiceBuyerSellerFilter(true, identificationNumber);
        InvoiceBuyerSellerSpecification invoiceSpecification = new InvoiceBuyerSellerSpecification(invoiceFilter);
        return invoiceRepository.findAll(invoiceSpecification)
                .stream()
                .map(i -> invoiceMapper.toDTO(i))
                .collect(Collectors.toList());
    }

    /*
     * fetches seller invoices by identification number
     * @params String identificationNumber = identification number of the selected person
     * @return List<InvoiceDTO>*/
    @Override
    public List<InvoiceDTO> getSellersByIdNum(String identificationNumber) {
        InvoiceBuyerSellerFilter invoiceFilter = new InvoiceBuyerSellerFilter(false, identificationNumber);
        InvoiceBuyerSellerSpecification invoiceSpecification = new InvoiceBuyerSellerSpecification(invoiceFilter);
        return invoiceRepository.findAll(invoiceSpecification)
                .stream()
                .map(i -> invoiceMapper.toDTO(i))
                .collect(Collectors.toList());
    }
}

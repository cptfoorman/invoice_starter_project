package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.mapper.InvoiceMapper;
import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.filter.InvoiceFilter;
import cz.itnetwork.entity.repository.InvoiceRepository;
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


    //nepouzita entita jako v person protoze invoice bude mit vazbu na persons
    @Override
    public InvoiceDTO getInvoice(long id) {
        return invoiceMapper.toDTO(invoiceRepository.getReferenceById(id));
    }

    @Override
    public List<InvoiceDTO> getAllInvoices(InvoiceFilter invoiceFilter) {
        InvoiceSpecification invoiceSpecification = new InvoiceSpecification(invoiceFilter);
        return invoiceRepository.findAll(invoiceSpecification, PageRequest.of(0,invoiceFilter.getLimit()))
                .stream()
                .map(i -> invoiceMapper.toDTO(i))
                .collect(Collectors.toList());
    }

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

    @Override
    public InvoiceDTO addInvoice(InvoiceDTO invoiceDTO) {
        InvoiceEntity newInvoiceEntity = invoiceMapper.toEntity(invoiceDTO);
        invoiceRepository.save(newInvoiceEntity);
        return invoiceMapper.toDTO(newInvoiceEntity);
    }

    @Override
    public InvoiceDTO editInvoice(long id, InvoiceDTO invoiceDTO) {
        if (!invoiceRepository.existsById(id)) {
            throw new EntityNotFoundException("Person with id " + id + " wasn't found in the database.");
        }
        InvoiceEntity entity = invoiceMapper.toEntity(invoiceDTO);
        entity.setId(id);
        InvoiceEntity saved = invoiceRepository.save(entity);
        return invoiceMapper.toDTO(saved);
    }

    @Override
    public List<InvoiceDTO> getBuyersByIdNum(long idNum) {
        return List.of();
    }

    @Override
    public List<InvoiceDTO> getSellersByIdNum(long idNum) {
        return List.of();
    }

    //vytvorit funkci na nalezeni faktur podle idNum prodejce
    //kroky:
    //spojit idNum kterej dostaneme s idNum v seller objektu

}

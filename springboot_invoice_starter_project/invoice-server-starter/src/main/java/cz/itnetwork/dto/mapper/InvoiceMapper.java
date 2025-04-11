package cz.itnetwork.dto.mapper;


import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.entity.InvoiceEntity;
import org.mapstruct.Mapper;

@Mapper
public interface InvoiceMapper {

    InvoiceDTO toDTO(InvoiceEntity invoiceEntity);

    InvoiceEntity toEntity(InvoiceDTO invoiceDTO);
}

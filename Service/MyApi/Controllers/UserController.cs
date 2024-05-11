using ApiCatalog.ResponseBuilder;
using AutoMapper;
using Core.DTOs.Request;
using Core.DTOs.Response;
using Core.Entities;
using Core.Interfaces.Repository;
using Core.Pagination;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Utils;

namespace ApiCatalog.Controllers
{
    [Route("/api/v1/User")]
    [ApiController]
    public class UserController : ControllerBase
{
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public UserController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult Create([FromForm] UserRequestDTO userRequestDTO)
        {

            var userCreated = _unitOfWork.UserRepository.Create(_mapper.Map<User>(userRequestDTO));

            _unitOfWork.Commit();

            return Ok(new ResponseModelBuilder().WithMessage("Usuário criado com sucesso!")
                                                .WithSuccess(true)
                                                .WithData(userCreated)
                                                .WithAlert(AlertType.Success)
                                                .Build());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {

            var User = _unitOfWork.UserRepository.GetById(id);

            if (User != null)
            {
                return Ok(new ResponseModelBuilder().WithMessage("Busca pelo usuário realizada com sucesso")
                                                .WithSuccess(true)
                                                .WithData(_mapper.Map<UserResponseDTO>(User))
                                                .WithAlert(AlertType.Success)
                                                .Build());
            }
            else
            {
                return NotFound(new ResponseModelBuilder().WithMessage("Usuário não encontrado na base de dados")
                                                        .WithSuccess(false)
                                                        .WithData(id)
                                                        .WithAlert(AlertType.Error)
                                                        .Build());
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _unitOfWork.UserRepository.GetAll();

            if (users != null)
            {
                return Ok(new ResponseModelBuilder().WithMessage("Busca pelos usuários realizada com sucesso")
                                                .WithSuccess(true)
                                                .WithData(users)
                                                .WithAlert(AlertType.Success)
                                                .Build());
            }
            else
            {
                return NotFound(new ResponseModelBuilder().WithMessage("Usuário não encontrado na base de dados")
                                                        .WithSuccess(false)
                                                        .WithAlert(AlertType.Error)
                                                        .Build());
            }
        }

        [HttpGet("pagination")]
        public ActionResult<IEnumerable<UserResponseDTO>> Get([FromQuery]
                                                                PaginationBase<User> PaginationProduct)
        {
            var users = _unitOfWork.UserRepository.GetAllPagination(PaginationProduct);

            if (users != null && users.Any())
            {
                var metaData = new
                {
                    users.TotalCount,
                    users.PageSize,
                    users.CurrentPage,
                    users.TotalPage,
                    users.HasNext,
                    users.HasPrevious,
                };

                Response.Headers.Append("X-Pagination", JsonConvert.SerializeObject(metaData));


                return Ok(new ResponseModelBuilder().WithMessage("Busca pelos usuários realizada com sucesso")
                                                .WithSuccess(true)
                                                .WithData(users)
                                                .WithAlert(AlertType.Success)
                                                .Build());
            }
            else
            {
                return NotFound(new ResponseModelBuilder().WithMessage("Usuário não encontrado na base de dados")
                                                        .WithSuccess(false)
                                                        .WithAlert(AlertType.Error)
                                                        .Build());
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromForm] UserRequestDTO userRequestDTO)
        {
            var user = _unitOfWork.UserRepository.GetById(id);

            if (user != null)
            {
                var userUpdate = _unitOfWork.UserRepository.Update(_mapper.Map<User>(userRequestDTO));

                _unitOfWork.Commit();

                return Ok(new ResponseModelBuilder().WithMessage("Usuário atualizado com sucesso!")
                                                    .WithSuccess(true)                                               
                                                    .WithAlert(AlertType.Success)
                                                    .Build());
            }
            else
            {
                return NotFound(new ResponseModelBuilder().WithMessage("Usuário não encontrado na base de dados")
                                                            .WithSuccess(false)
                                                            .WithData(id)
                                                            .WithAlert(AlertType.Error)
                                                            .Build());
            }
        }

        [HttpPatch("{id}/UpdatePartial")]
        public ActionResult<UserResponseDTO> Patch(int id, JsonPatchDocument<UserRequestDTO> userRequestJsonPatchDTO)
        {
            if (userRequestJsonPatchDTO == null || IDHelper.IsIdInvalid(id))
                BadRequest(new ResponseModelBuilder().WithMessage("Erro ao atualizar usuário")
                                                        .WithSuccess(false)
                                                        .WithData(id)
                                                        .WithAlert(AlertType.Error)
                                                        .Build());

            var user = _unitOfWork.UserRepository.GetById(id);

            if (user == null)
                NotFound(new ResponseModelBuilder().WithMessage("Usuário não encontrado na base de dados")
                                                        .WithSuccess(false)
                                                        .WithData(id)
                                                        .WithAlert(AlertType.Error)
                                                        .Build());

            var userRequestDTO = _mapper.Map<UserRequestDTO>(user);

            userRequestJsonPatchDTO.ApplyTo(userRequestDTO, ModelState);

            if (ModelState.IsValid || TryValidateModel(userRequestDTO))
                BadRequest(ModelState);


            user = _unitOfWork.UserRepository.Update(_mapper.Map<User>(userRequestDTO));

            _unitOfWork.Commit();

            return Ok(new ResponseModelBuilder().WithMessage("Usuário atualizado com sucesso!")
                                                .WithSuccess(true)
                                                .WithData(user)
                                                .WithAlert(AlertType.Success)
                                                .Build());

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id) 
        {
            var product = _unitOfWork.UserRepository.GetById(id);

            if (product != null)
            {
                _unitOfWork.UserRepository.Delete(id);
                _unitOfWork.Commit();
                return Ok(new ResponseModelBuilder().WithMessage("Usuário excluido com sucesso!")
                                                    .WithSuccess(true)
                                                    .WithData(id)
                                                    .WithAlert(AlertType.Success)
                                                    .Build());
            }
            else
            {
                return NotFound(new ResponseModelBuilder().WithMessage("Usuário não encontrado na base de dados")
                                                        .WithSuccess(false)
                                                        .WithData(id)
                                                        .WithAlert(AlertType.Error)
                                                        .Build());
            }
        }
    }
}

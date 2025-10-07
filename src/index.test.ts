import {getJsonStructure} from './index'

describe('convert', () => {
  it('schema to json', () => {
    const schema = {
      title: 'Product',
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: {type: 'string'},
            personalNumber: {type: 'string'},
            firstName: {type: 'string'},
            lastName: {type: 'string'},
            email: {type: 'string'},
            phoneNumber: {type: 'string'},
            address: {type: 'string'},
            city: {type: 'string'},
            zipCode: {type: 'string'},
            country: {type: 'string'},
            dateOfBirth: {type: 'string'},
            username: {type: 'string'},
          },
        },
        list: {type: 'array', items: {type: 'string'}},
        orders: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {type: 'string'},
              createdAt: {type: 'string'},
              status: {type: 'string'},
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    productId: {type: 'string'},
                    name: {type: 'string'},
                    price: {type: 'number'},
                    quantity: {type: 'number'},
                  },
                  required: [],
                },
              },
              price: {type: 'string'},
              currency: {type: 'string'},
              shippingAddress: {type: 'string'},
              trackingNumber: {type: 'string'},
              paymentMethod: {type: 'string'},
            },
            required: [],
          },
        },
      },
    }

    const result = getJsonStructure(schema)
    expect(result).toEqual({
      user: {
        id: 'string',
        personalNumber: 'string',
        firstName: 'string',
        lastName: 'string',
        email: 'string',
        phoneNumber: 'string',
        address: 'string',
        city: 'string',
        zipCode: 'string',
        country: 'string',
        dateOfBirth: 'string',
        username: 'string',
      },
      list: ['string'],
      orders: [
        {
          id: 'string',
          createdAt: 'string',
          status: 'string',
          items: [
            {
              productId: 'string',
              name: 'string',
              price: 'number',
              quantity: 'number',
            },
          ],
          price: 'string',
          currency: 'string',
          shippingAddress: 'string',
          trackingNumber: 'string',
          paymentMethod: 'string',
        },
      ],
    })
  })

  it('schema to json 2', () => {
    const schema = {
      type: 'object',
      properties: {
        orderId: {
          type: 'string',
        },
        customer: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
          },
        },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              productId: {
                type: 'integer',
              },
              name: {
                type: 'string',
              },
              price: {
                type: 'number',
              },
              quantity: {
                type: 'integer',
              },
            },
          },
        },
        total: {
          type: 'number',
        },
        paid: {
          type: 'boolean',
        },
        shippedAt: {
          type: 'null',
        },
      },
    }

    const result = getJsonStructure(schema)

    expect(result).toEqual({
      orderId: 'string',
      customer: {
        id: 'integer',
        name: 'string',
        email: 'string',
      },
      items: [
        {
          productId: 'integer',
          name: 'string',
          price: 'number',
          quantity: 'integer',
        },
      ],
      total: 'number',
      paid: 'boolean',
      shippedAt: 'null',
    })
  })

  it('schema to json with example', () => {
    const schema = {
      type: 'object',
      properties: {
        customer: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 17,
              examples: [17],
            },
            name: {
              type: 'string',
              example: 'John Doe',
              examples: ['John Doe'],
            },
            email: {
              type: 'string',
              example: 'john@example.com',
              examples: ['john@example.com'],
            },
          },
          required: ['id', 'name', 'email'],
          additionalProperties: false,
        },
      },
      required: ['customer'],
      additionalProperties: false,
    }

    const result = getJsonStructure(schema, {
      useExample: true,
    })

    expect(result).toEqual({
      customer: {
        id: 17,
        name: 'John Doe',
        email: 'john@example.com',
      },
    })
  })
})

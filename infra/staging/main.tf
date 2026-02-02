# =====================================================
# Random values
# =====================================================

resource "random_integer" "suffix" {
  min = 10000
  max = 99999
}

# =====================================================
# Resource Group
# =====================================================

resource "azurerm_resource_group" "duelapp_fe_rg" {
  name     = "rg-duelapp-fe-staging"
  location = "polandcentral"

  tags = {
    environment = "staging"
    project     = "duelapp"
    component   = "frontend"
  }
}

# =====================================================
# App Service Plan
# =====================================================

resource "azurerm_service_plan" "duelapp_fe_plan" {
  name                = "asp-duelapp-fe-staging${random_integer.suffix.result}"
  location            = azurerm_resource_group.duelapp_fe_rg.location
  resource_group_name = azurerm_resource_group.duelapp_fe_rg.name

  os_type  = "Linux"
  sku_name = "B1"

  tags = {
    environment = "staging"
    project     = "duelapp"
    component   = "frontend"
  }
}

# =====================================================
# Linux Web App
# =====================================================

resource "azurerm_linux_web_app" "duelapp_fe" {
  name                = "staging-duelapp-fe${random_integer.suffix.result}"
  location            = azurerm_resource_group.duelapp_fe_rg.location
  resource_group_name = azurerm_resource_group.duelapp_fe_rg.name
  service_plan_id     = azurerm_service_plan.duelapp_fe_plan.id

  enabled                       = true
  https_only                    = true
  public_network_access_enabled = true
  client_affinity_enabled       = false

  identity {
    type = "SystemAssigned"
  }

  site_config {
    always_on = false

    application_stack {
      node_version = "20-lts"
    }

    app_command_line = "pm2 serve /home/site/wwwroot --no-daemon --spa"

    ftps_state          = "FtpsOnly"
    minimum_tls_version = "1.2"
    use_32_bit_worker   = true
    worker_count        = 1

    http2_enabled       = false
    websockets_enabled  = false
    load_balancing_mode = "LeastRequests"
  }

  app_settings = {
    WEBSITE_RUN_FROM_PACKAGE = "1"
  }

  tags = {
    environment = "staging"
    project     = "duelapp"
    component   = "frontend"
  }
}
